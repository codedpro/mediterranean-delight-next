import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
        userId: session.user.id,
        status: "pending",
      },
    });

    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: session.user.id,
          total,
          status: "pending",
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