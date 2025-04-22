import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from "stripe";
import { z } from "zod";

interface OrderItem {
  menuItemId: string;
  quantity: number;
  price: number;
}

interface OrderData {
  items: OrderItem[];
  total: number;
}

const orderSchema = z.object({
  items: z.array(
    z.object({
      menuItemId: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  total: z.number().min(0),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check for required environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not defined');
      return NextResponse.json(
        { error: "Payment service configuration error" },
        { status: 500 }
      );
    }

    // Initialize Stripe with proper error handling
    let stripe: Stripe;
    try {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      });
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      return NextResponse.json(
        { error: "Payment service initialization failed" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Calculate total
    const total = validatedData.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Create Stripe payment intent with error handling
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100), // Convert to cents
        currency: "usd",
        metadata: {
          userId: session.user.id,
        },
      });
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      return NextResponse.json(
        { error: "Failed to process payment" },
        { status: 500 }
      );
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        items: {
          create: validatedData.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    return NextResponse.json({
      order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
} 