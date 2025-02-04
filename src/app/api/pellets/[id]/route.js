import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import { Pellet } from "@/models/Pellet";
import { getUserIdFromToken } from "@/lib/tokenUtils";

export async function DELETE(req, { params }) {
    await connectToDatabase();
  
    const emailId = await getUserIdFromToken(req);
  
    try {
      
      const { id } = await params;
  
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