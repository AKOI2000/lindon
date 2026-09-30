"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function createBooking({
  apartmentId,
  checkIn,
  checkOut,
  guests,
  notes,
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to make a booking.");
  }

  if (!apartmentId || !checkIn || !checkOut) {
    throw new Error("Missing booking information.");
  }

  const parsedCheckIn = new Date(checkIn);
  const parsedCheckOut = new Date(checkOut);

  if (
    Number.isNaN(parsedCheckIn.getTime()) ||
    Number.isNaN(parsedCheckOut.getTime())
  ) {
    throw new Error("Invalid booking dates.");
  }

  if (parsedCheckOut <= parsedCheckIn) {
    throw new Error("Check-out must be after check-in.");
  }

  const apartment = await prisma.apartment.findUnique({
    where: { id: apartmentId },
    select: {
      id: true,
      pricePerNight: true,
      guestCapacity: true,
      isActive: true,
    },
  });

  if (!apartment || !apartment.isActive) {
    throw new Error("This apartment is no longer available.");
  }

  if (guests < 1 || guests > apartment.guestCapacity) {
    throw new Error("Invalid number of guests.");
  }

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      apartmentId,
      status: { not: "CANCELLED" },
      checkIn: { lt: parsedCheckOut },
      checkOut: { gt: parsedCheckIn },
    },
    select: { id: true },
  });

  if (conflictingBooking) {
    throw new Error(
      "These dates are no longer available. Please choose different dates.",
    );
  }

  const millisecondsPerNight = 1000 * 60 * 60 * 24;

  const nights = Math.ceil(
    (parsedCheckOut - parsedCheckIn) / millisecondsPerNight,
  );

  const totalPrice = nights * apartment.pricePerNight;

  const reference = `LND-${crypto
    .randomUUID()
    .replace(/-/g, "")
    .slice(0, 10)
    .toUpperCase()}`;

  const booking = await prisma.booking.create({
    data: {
      reference,
      checkIn: parsedCheckIn,
      checkOut: parsedCheckOut,
      guests,
      totalPrice,
      notes: notes || null,
      userId: session.user.id,
      apartmentId,
    },
    select: {
      id: true,
      reference: true,
    },
  });

  revalidateTag(`bookings-${apartmentId}`, "max");
  revalidateTag(`user-bookings-${session.user.id}`, "max");

  return booking;
}

export async function updateBooking({
  bookingId,
  checkIn,
  checkOut,
  guests,
  notes,
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  if (!bookingId || !checkIn || !checkOut) {
    throw new Error("Missing booking information.");
  }

  const parsedCheckIn = new Date(checkIn);
  const parsedCheckOut = new Date(checkOut);

  if (
    Number.isNaN(parsedCheckIn.getTime()) ||
    Number.isNaN(parsedCheckOut.getTime())
  ) {
    throw new Error("Invalid booking dates.");
  }

  if (parsedCheckOut <= parsedCheckIn) {
    throw new Error("Check-out must be after check-in.");
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId: session.user.id,
    },
    select: {
      id: true,
      apartmentId: true,
      checkIn: true,
      checkOut: true,
      status: true,
    },
  });

  if (!booking) {
    throw new Error("Reservation not found.");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("This reservation has been cancelled.");
  }

  if (booking.checkOut <= new Date()) {
    throw new Error("Past reservations cannot be edited.");
  }

  const apartment = await prisma.apartment.findUnique({
    where: {
      id: booking.apartmentId,
    },
    select: {
      pricePerNight: true,
      guestCapacity: true,
      isActive: true,
    },
  });

  if (!apartment || !apartment.isActive) {
    throw new Error("This apartment is no longer available.");
  }

  if (guests < 1 || guests > apartment.guestCapacity) {
    throw new Error("Invalid number of guests.");
  }

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      apartmentId: booking.apartmentId,
      id: { not: booking.id },
      status: { not: "CANCELLED" },
      checkIn: { lt: parsedCheckOut },
      checkOut: { gt: parsedCheckIn },
    },
    select: {
      id: true,
    },
  });

  if (conflictingBooking) {
    throw new Error(
      "These dates are no longer available. Please choose different dates.",
    );
  }

  const millisecondsPerNight = 1000 * 60 * 60 * 24;

  const nights = Math.ceil(
    (parsedCheckOut - parsedCheckIn) / millisecondsPerNight,
  );

  const totalPrice = nights * apartment.pricePerNight;

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      checkIn: parsedCheckIn,
      checkOut: parsedCheckOut,
      guests,
      totalPrice,
      notes: notes || null,
    },
    select: {
      id: true,
      reference: true,
    },
  });

  revalidateTag(`bookings-${booking.apartmentId}`, "max");
  revalidateTag(`user-bookings-${session.user.id}`, "max");

  return updatedBooking;
}

export async function cancelBooking(bookingId) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  if (!bookingId) {
    throw new Error("Missing reservation.");
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId: session.user.id,
    },
    select: {
      id: true,
      apartmentId: true,
      checkOut: true,
      status: true,
    },
  });

  if (!booking) {
    throw new Error("Reservation not found.");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("This reservation has already been cancelled.");
  }

  if (booking.checkOut <= new Date()) {
    throw new Error("Past reservations cannot be cancelled.");
  }

  const updatedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status: "CANCELLED",
    },
    select: {
      id: true,
      reference: true,
      status: true,
    },
  });

  revalidateTag(`bookings-${booking.apartmentId}`, "max");
  revalidateTag(`user-bookings-${session.user.id}`, "max");

  return updatedBooking;
}