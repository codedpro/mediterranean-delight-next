import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { OrderStatus } from "@prisma/client";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database to ensure we have the correct ID
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: OrderStatus.PENDING,
      },
    });

    if (order) {
      // Delete order items
      await prisma.orderItem.deleteMany({
        where: { orderId: order.id },
      });

      // Delete order
      await prisma.order.delete({
        where: { id: order.id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 