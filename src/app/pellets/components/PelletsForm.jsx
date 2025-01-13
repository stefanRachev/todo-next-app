// src/app/pellets/components/PelletsForm.js
"use client";
import { useState } from "react";

export default function PelletsForm() {
  const [quantity, setQuantity] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState(new Date().getDate());
  const [bags, setBags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Изпращане на данните към базата
    console.log(
      `Въведени данни: ${quantity} пелети на ${dayOfMonth} дата, ${bags} чувала`
    );
    // Изпращаш данните към база
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-gray-700"
        >
          Брой чували
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="dayOfMonth"
          className="block text-gray-700"
        >
          Ден от месеца
        </label>
        <input
          type="number"
          id="dayOfMonth"
          value={dayOfMonth}
          onChange={(e) => {
            const value = e.target.value;
            if (value < 1) {
              setDayOfMonth(1);
            } else if (value > 31) {
              setDayOfMonth(31);
            } else {
              setDayOfMonth(value);
            }
          }}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="bags"
          className="block text-gray-700"
        >
          Брой чували
        </label>
        <input
          type="number"
          id="bags"
          value={bags}
          onChange={(e) => setBags(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Въведи
      </button>
    </form>
  );
}
