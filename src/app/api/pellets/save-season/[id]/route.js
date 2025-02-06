import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import { Season } from "@/models/Season";
import { getUserIdFromToken } from "@/lib/tokenUtils";

export async function DELETE(req, { params }) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Невалидни данни за сезона" },
        { status: 400 }
      );
    }

    const season = await Season.findOne({ _id: id });

    if (!season) {
      return NextResponse.json(
        { message: "Сезонът не беше намерен" },
        { status: 404 }
      );
    }

    if (season.user.toString() !== emailId) {
      return NextResponse.json(
        { message: "Нямате права да изтриете този сезон" },
        { status: 403 }
      );
    }

    await Season.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Сезонът беше изтрит успешно!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Грешка при изтриването на сезона:", error.message);
    return NextResponse.json(
      { message: "Грешка при изтриването на сезона" },
      { status: 500 }
    );
  }
}
