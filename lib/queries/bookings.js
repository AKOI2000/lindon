import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getBookedDateRanges(apartmentId) {
  const getCachedBookings = unstable_cache(
    async () => {
      try {
        return await prisma.booking.findMany({
          where: {
            apartmentId,
            status: "CONFIRMED",
            checkOut: {
              gt: new Date(),
            },
          },
          select: {
            checkIn: true,
            checkOut: true,
          },
          orderBy: {
            checkIn: "asc",
          },
        });
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);

        return [];
      }
    },
    [`booked-dates-${apartmentId}`],
    {
      tags: [`bookings-${apartmentId}`],
    },
  );

  const bookings = await getCachedBookings();

  return bookings.map((booking) => ({
    checkIn: new Date(booking.checkIn).toISOString(),
    checkOut: new Date(booking.checkOut).toISOString(),
  }));
}

export async function getBookingsForUser(userId) {
  const getCachedBookings = unstable_cache(
    async () => {
      try {
        return await prisma.booking.findMany({
          where: {
            userId,
            status: {
              not: "CANCELLED",
            },
          },
          orderBy: {
            checkIn: "asc",
          },
          select: {
            id: true,
            reference: true,
            checkIn: true,
            checkOut: true,
            guests: true,
            totalPrice: true,
            status: true,
            apartment: {
              select: {
                id: true,
                slug: true,
                name: true,
                location: true,
                images: true,
              },
            },
          },
        });
      } catch (error) {
        console.error("Failed to fetch user bookings:", error);

        return [];
      }
    },
    [`user-bookings-${userId}`],
    {
      tags: [`user-bookings-${userId}`],
    },
  );

  return getCachedBookings();
}

export async function getBookingForUser(bookingId, userId) {
  try {
    return await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
      select: {
        id: true,
        reference: true,
        checkIn: true,
        checkOut: true,
        guests: true,
        totalPrice: true,
        status: true,
        notes: true,
        createdAt: true,
        apartment: {
          select: {
            id: true,
            slug: true,
            name: true,
            location: true,
            images: true,
            bedrooms: true,
            bathrooms: true,
            guestCapacity: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch booking:", error);

    return null;
  }
}

export async function getBookedDateRangesForEdit(apartmentId, bookingId) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        apartmentId,
        id: {
          not: bookingId,
        },
        status: "CONFIRMED",
        checkOut: {
          gt: new Date(),
        },
      },
      select: {
        checkIn: true,
        checkOut: true,
      },
      orderBy: {
        checkIn: "asc",
      },
    });

    return bookings.map((booking) => ({
      checkIn: new Date(booking.checkIn).toISOString(),
      checkOut: new Date(booking.checkOut).toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch booked dates for edit:", error);
    return [];
  }
}