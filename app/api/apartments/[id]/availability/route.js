import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const bookings = await prisma.booking.findMany({
      where: {
        apartmentId: id,
        status: "CONFIRMED",
      },
      select: {
        checkIn: true,
        checkOut: true,
      },
      orderBy: {
        checkIn: "asc",
      },
    });

    return NextResponse.json({
      bookings,
    });
  } catch (error) {
    console.error("Failed to fetch apartment availability:", error);

    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}