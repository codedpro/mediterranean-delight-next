import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendReservationStatusEmail } from "@/lib/email";

const updateReservationSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateReservationSchema.parse(body);

    const currentReservation = await prisma.reservation.findUnique({
      where: { id: params.id },
    });

    if (!currentReservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: params.id },
      data: { status: validatedData.status },
    });

    // Send email notification if status has changed
    if (currentReservation.status !== validatedData.status) {
      try {
        await sendReservationStatusEmail(
          currentReservation.email,
          currentReservation.name,
          currentReservation.date,
          currentReservation.time,
          validatedData.status
        );
      } catch (error) {
        console.error("Failed to send email notification:", error);
      }
    }

    return NextResponse.json(updatedReservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 