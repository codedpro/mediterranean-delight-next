import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with proper error handling
let stripe: Stripe;
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });
} catch (error) {
  console.error("Error initializing Stripe:", error);
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      throw new Error("Stripe is not properly initialized");
    }

    const { items, total } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No items in the order" },
        { status: 400 }
      );
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description || "",
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3002"}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3002"}/order`,
      metadata: {
        orderTotal: total.toString(),
      },
    });

    if (!session || !session.id) {
      throw new Error("Failed to create Stripe session");
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error creating checkout session" },
      { status: 500 }
    );
  }
} 