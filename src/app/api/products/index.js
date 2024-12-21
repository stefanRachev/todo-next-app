// import { Product } from "@/models/Product";
// import { auth } from "@/auth";
// import { NextResponse } from "next/server";
// import connectToDatabase from "@/lib/mongoDB";

// export async function POST(request) {

//   const { name, quantity } = await request.json();

//   if (!name || !quantity) {
//     return NextResponse.json(
//       { error: "Име на продукта и количество са задължителни" },
//       { status: 400 }
//     );
//   }

//   await connectToDatabase();

//   try {
//     const newProduct = new Product({
//       user: session.user._id,
//       name,
//       quantity,
//     });

//     await newProduct.save();

//     return NextResponse.json(
//       { message: "Продуктът беше добавен успешно", newProduct },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Грешка при добавяне на продукт:", error);
//     return NextResponse.json(
//       { error: "Грешка при добавяне на продукт" },
//       { status: 500 }
//     );
//   }
// }

