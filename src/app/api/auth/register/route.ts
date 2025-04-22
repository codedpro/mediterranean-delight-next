import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    console.log("Registration attempt started");
    const body = await request.json();
    console.log("Request body:", body);

    const validatedData = registerSchema.parse(body);
    console.log("Validated data:", validatedData);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    console.log("Existing user check:", existingUser);

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    console.log("Password hashed");

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: "USER", // Default role
      },
    });
    console.log("User created:", user);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error details:", error);

    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return NextResponse.json(
        { message: "Invalid input data", errors: error.errors },
        { status: 400 }
      );
    }

    // Check if the error is a MongoDB duplicate key error
    if (error.code === 11000) {
      console.error("Duplicate key error");
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Log the full error for debugging
    console.error("Full error object:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
} 