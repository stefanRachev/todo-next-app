import { auth } from "@/auth";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const session = await auth();

    const isExternalProvider =
    session?.user?.authProvider &&
    session?.user?.authProvider !== "credentials";

    if (isExternalProvider) {
      return NextResponse.json(
        { message: "Не може да смените паролата, ако сте влезли с външен доставчик" },
        { status: 400 }
      );
    }

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Не сте автентикиран" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, confirmNewPassword } =
      await req.json();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { message: "Всички полета са задължителни" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Паролата трябва да е поне 6 символа" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { message: "Паролите не съвпадат" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email }).select(
      "+password"
    );
    if (!user) {
      return NextResponse.json(
        { message: "Потребителят не е намерен" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Текущата парола е грешна" },
        { status: 400 }
      );
    }

    
    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      { message: "Паролата е сменена успешно!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Грешка при смяната на паролата" },
      { status: 500 }
    );
  }
}
