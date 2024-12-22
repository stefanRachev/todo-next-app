<<<<<<< HEAD
// /pages/api/products/route.js
import { getToken } from "next-auth/jwt";
=======
// /pages/api/products/index.js
//import { getToken } from "next-auth/jwt";
>>>>>>> a945cad901af2e60b6b6ef7e07fe3cff214d7502
import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import connectToDatabase from "@/lib/mongoDB";

export async function POST(req) {
  await connectToDatabase();

  //const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // console.log("печатане на req.headers", req.headers);
  // console.log("печатане на cookies", req.cookies);
  // console.log("печатане на токен", token);

  const authorizationHeader = req.headers.get("authorization");
  const vercelSignature = req.headers.get("x-vercel-proxy-signature");

  console.log("Authorization Header:", authorizationHeader);
  console.log("Vercel Signature:", vercelSignature);


  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Не сте влезли в системата" },
      { status: 401 }
    );
  }

<<<<<<< HEAD
=======
  try {
    const userId = token?.sub;
>>>>>>> a945cad901af2e60b6b6ef7e07fe3cff214d7502

 

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
