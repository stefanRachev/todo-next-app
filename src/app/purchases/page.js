"use client";
//import { useState } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Purchases() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const name = e.target["product-name"].value;
  //   const quantity = e.target["quantity"].value;

   
  //   const res = await fetch("/api/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, quantity }),
  //   });

  //   if (res.ok) {
  //     const newProduct = await res.json();
  //     console.log("Продуктът е създаден успешно:", newProduct);
  //   } else {
  //     console.error("Неуспешно добавяне на продукт");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Създаване на списък за покупки
        </h1>

        <form  className="space-y-4">
          <div>
            <label htmlFor="product-name" className="block text-gray-700">
              Име на продукта:
            </label>
            <input
              type="text"
              id="product-name"
              placeholder="Въведете име на продукта"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-gray-700">
              Брой:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              placeholder="Въведете количество"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Добави в списъка
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
