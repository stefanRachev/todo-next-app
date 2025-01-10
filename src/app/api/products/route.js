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

    if (productName.length > 31) {
      return NextResponse.json(
        {
          message: "Името на продукта не може да бъде по-дълго от 26 символа.",
        },
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
    const products = await Product.find({ user: emailId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json(
      { message: "Грешка при взимането на продуктите" },
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
        { message: "Невалидни данни за продукта" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return NextResponse.json(
        { message: "Продуктът не беше намерен" },
        { status: 404 }
      );
    }

    if (product.user !== emailId) {
      return NextResponse.json(
        { message: "Нямате права да изтриете този продукт" },
        { status: 403 }
      );
    }

    await Product.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Продуктът беше изтрит успешно" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return NextResponse.json(
      { message: "Грешка при изтриването на продукта" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connectToDatabase();

  const emailId = await getUserIdFromToken(req);

  try {
    const { id, productName } = await req.json();

    if (!id || !productName) {
      return NextResponse.json(
        { message: "Невалидни данни за продукта" },
        { status: 400 }
      );
    }

    if (productName.length > 31) {
      return NextResponse.json(
        {
          message: "Името на продукта не може да бъде по-дълго от 26 символа.",
        },
        { status: 400 }
      );
    }

    const formattedName =
      productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return NextResponse.json(
        { message: "Продуктът не беше намерен" },
        { status: 404 }
      );
    }

    if (product.user !== emailId) {
      return NextResponse.json(
        { message: "Нямате права да редактирате този продукт" },
        { status: 403 }
      );
    }

    product.productName = formattedName;

    await product.save();

    return NextResponse.json(
      {
        message: "Продуктът беше редактиран успешно",
        product: product.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing product:", error.message);
    return NextResponse.json(
      { message: "Грешка при редактирането на продукта" },
      { status: 500 }
    );
  }
}
