import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { OrderStatus } from "@prisma/client";

export async function POST(request: Request) {
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

    const { items } = await request.json();

    // Calculate total
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Find or create order
    let order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: OrderStatus.PENDING,
      },
    });

    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: user.id,
          total,
          status: OrderStatus.PENDING,
        },
      });
    } else {
      // Update existing order
      await prisma.order.update({
        where: { id: order.id },
        data: { total },
      });

      // Delete existing items
      await prisma.orderItem.deleteMany({
        where: { orderId: order.id },
      });
    }

    // Create new order items
    await prisma.orderItem.createMany({
      data: items.map((item: any) => ({
        orderId: order.id,
        menuItemId: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 