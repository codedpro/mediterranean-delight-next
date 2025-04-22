import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { sendReservationStatusEmail } from "@/lib/email";
import { format } from "date-fns";

const updateSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = updateSchema.parse(body);

    // Get the current reservation to check if status is changing
    const currentReservation = await prisma.reservation.findUnique({
      where: { id: params.id },
    });

    if (!currentReservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    // Update the reservation
    const reservation = await prisma.reservation.update({
      where: {
        id: params.id,
      },
      data: {
        status: validatedData.status,
      },
    });

    // Send email notification if status has changed
    if (currentReservation.status !== validatedData.status) {
      try {
        await sendReservationStatusEmail(
          reservation.email,
          reservation.name,
          format(reservation.date, "MMMM d, yyyy"),
          reservation.time,
          validatedData.status
        );
      } catch (error) {
        console.error("Failed to send email notification:", error);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(reservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 