import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import { Pellet } from "@/models/Pellet";
import { getUserIdFromToken } from "@/lib/tokenUtils";
import mongoose from "mongoose";

export async function POST(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { date, bags } = await req.json();

    const dateValue = new Date(date);
    if (isNaN(dateValue.getTime())) {
      return NextResponse.json({ message: "Невалидна дата" }, { status: 400 });
    }

    const bagsParsed = parseInt(bags, 10);
    if (isNaN(bagsParsed)) {
      return NextResponse.json(
        { message: "Невалиден брой пелети" },
        { status: 400 }
      );
    }

    const newPellet = new Pellet({
      date: dateValue,
      bags: bagsParsed,
      user: emailId,
    });
    await newPellet.save();

    const createdPellet = newPellet.toObject();
    return NextResponse.json(
      { message: "Пелетът беше създаден успешно!", pellet: createdPellet },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating pellet:", error.message);
    return NextResponse.json(
      { message: "Грешка при създаването на записа" },
      { status: 500 }
    );
  }
}
