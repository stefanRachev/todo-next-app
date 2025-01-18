import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import { Pellet } from "@/models/Pellet";
import { getUserIdFromToken } from "@/lib/tokenUtils";

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

export async function GET(req) {
  await connectToDatabase();

  try {
    const emailId = await getUserIdFromToken(req);

    if (!emailId) {
      return NextResponse.json(
        { message: "Неоторизиран достъп" },
        { status: 401 }
      );
    }
    const pellets = await Pellet.find({ user: emailId }).sort({
      date: -1,
      _id: -1,
    });

    return NextResponse.json(pellets, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return NextResponse.json(
      { message: "Грешка при взимането на пелетите" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Невалидни данни за пелетите" },
        { status: 400 }
      );
    }

    const pellet = await Pellet.findOne({ _id: id });

    if (!pellet) {
      return NextResponse.json(
        { message: "Пелетът не беше намерен" },
        { status: 404 }
      );
    }

    if (pellet.user !== emailId) {
      return NextResponse.json(
        { message: "Нямате права да изтриете този пелет" },
        { status: 403 }
      );
    }

    await Pellet.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Пелетът беше изтрит успешно!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting pellet:", error.message);
    return NextResponse.json(
      { message: "Грешка при изтриването на пелета" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { id, date, bags } = await req.json();

    if (!id || !date || !bags) {
      return NextResponse.json(
        { message: "Невалидни данни за пелетите" },
        { status: 400 }
      );
    }

    const pellet = await Pellet.findOne({ _id: id });

    if (!pellet) {
      return NextResponse.json(
        { message: "Данните за пелетът не беше намерен!" },
        { status: 404 }
      );
    }

    if (pellet.user !== emailId) {
      return NextResponse.json(
        { message: "Нямате права да редактирате данните за пелетите" },
        { status: 403 }
      );
    }

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

    pellet.date = dateValue;
    pellet.bags = bagsParsed;

    await pellet.save();

    return NextResponse.json(
      {
        message: "Пелетът беше редактиран успешно",
        pellet: pellet.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing pellet:", error.message);
    return NextResponse.json(
      { message: "Грешка при редактирането на пелета" },
      { status: 500 }
    );
  }
}
