import { getUserIdFromToken } from "@/lib/tokenUtils";
import { NextResponse } from "next/server";
import { Task } from "@/models/Task";
import connectToDatabase from "@/lib/mongoDB";

export async function POST(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { taskName } = await req.json();

    if (!taskName) {
      return NextResponse.json(
        { message: "Невалидни данни за задачата" },
        { status: 400 }
      );
    }

    const newTask = new Task({
      taskName,
      user: emailId,
    });

    await newTask.save();
    const createdTask = newTask.toObject();

    return NextResponse.json(
      {
        message: "Задачата беше създадена успешно!",
        task: createdTask,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error.message);
    return NextResponse.json(
      { message: "Грешка при създаването на задачата" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectToDatabase();
  try {
    const emailId = await getUserIdFromToken(req);
    const tasks = await Task.find({ user: emailId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return NextResponse.json(
      { message: "Грешка при взимането на задачите" },
      { status: 500 }
    );
  }
}
