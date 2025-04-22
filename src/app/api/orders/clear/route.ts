import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        status: "pending",
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