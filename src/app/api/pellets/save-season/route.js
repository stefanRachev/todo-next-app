import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import { Season } from "@/models/Season";
import { getUserIdFromToken } from "@/lib/tokenUtils";

export async function POST(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { totalBags, totalTons, dates, firstDate, lastDate } =
      await req.json();

    const newSeasonData = new Season({
      totalBags,
      totalTons,
      dates,
      firstDate,
      lastDate,
      user: emailId,
    });

    await newSeasonData.save();

    return NextResponse.json(
      { message: "Нови сезонни данни бяха успешно запазени." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Грешка при записване на данни:", error);
    return NextResponse.json(
      { error: "Неуспешно записване на сезонни данни." },
      { status: 500 }
    );
  }
}



export async function GET(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    
    const userSeasons = await Season.find({ user: emailId });

    if (!userSeasons || userSeasons.length === 0) {
      return NextResponse.json(
        { message: "Няма налични завършени сезони за този потребител." },
        { status: 200 } 
      );
    }

    return NextResponse.json(userSeasons, { status: 200 });
  } catch (error) {
    console.error("Грешка при извличане на сезоните:", error);
    return NextResponse.json(
      { error: "Неуспешно извличане на сезоните." },
      { status: 500 }
    );
  }
}
