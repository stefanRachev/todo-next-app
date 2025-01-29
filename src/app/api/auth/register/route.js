import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import { User } from "@/models/User";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return new NextResponse(
        JSON.stringify({
          message: "Password must be at least 6 characters long",
        }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully",
        user: { id: newUser._id, email: newUser.email, name: newUser.name },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
