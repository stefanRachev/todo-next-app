// /pages/api/products/route.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import connectToDatabase from "@/lib/mongoDB";

export async function POST(req) {
  await connectToDatabase();

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: "__Secure-authjs.session-token",
  });

  // const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  console.log("печатане на апи сървър токен", token);

  if (!token) {
    return NextResponse.json(
      { message: "Не сте влезли в системата" },
      { status: 401 }
    );
  }

  try {
    const { productName, quantity } = await req.json();

    if (!productName || quantity < 1) {
      return NextResponse.json(
        { message: "Невалидни данни за продукта" },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      productName,
      quantity,
      user: token.sub,
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Продуктът беше създаден успешно!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error.message);
    return NextResponse.json(
      { message: "Грешка при създаването на продукта" },
      { status: 500 }
    );
  }
}
