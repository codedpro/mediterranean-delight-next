import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendReservationStatusEmail } from "@/lib/email";
import { format } from "date-fns";

const reservationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string(),
  time: z.string(),
  partySize: z.number().min(1).max(20),
  specialRequests: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = reservationSchema.parse(body);

    // Check for existing reservations at the same time
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        date: new Date(validatedData.date),
        time: validatedData.time,
        status: {
          not: "cancelled",
        },
      },
    });

    if (existingReservation) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 400 }
      );
    }

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        userId: session.user.id,
      },
    });

    // Send confirmation email
    try {
      await sendReservationStatusEmail(
        session.user.email!,
        session.user.name!,
        format(reservation.date, "MMMM d, yyyy"),
        reservation.time,
        "pending"
      );
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      // Don't fail the request if email fails
    }

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Reservation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    const reservations = await prisma.reservation.findMany({
      where: {
        ...(date ? { date: new Date(date) } : {}),
        status: {
          not: "cancelled",
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 