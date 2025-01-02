//app/api/products/route.js
import { getUserIdFromToken } from "@/lib/tokenUtils";
import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import connectToDatabase from "@/lib/mongoDB";

export async function POST(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { productName } = await req.json();

    if (!productName) {
      return NextResponse.json(
        { message: "Невалидни данни за продукта" },
        { status: 400 }
      );
    }

    const formattedName =
      productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();

    const newProduct = new Product({
      productName: formattedName,
      user: emailId,
    });

    await newProduct.save();
    const createdProduct = newProduct.toObject();

    return NextResponse.json(
      {
        message: "Задачата беше създадена успешно!",
        product: createdProduct,
      },
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

export async function GET(req) {
  await connectToDatabase();

  try {
    const emailId = await getUserIdFromToken(req);
    const products = await Product.find({ user: emailId });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json(
      { message: "Грешка при взимането на продуктите" },
      { status: 500 }
    );
  }
}
