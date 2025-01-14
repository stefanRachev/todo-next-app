// src/app/pellets/components/PelletsForm.jsx
"use client";
import { useState } from "react";

export default function PelletsForm() {
  const today = new Date();
  const [date, setDate] = useState({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const [bags, setBags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Въведени данни: ${date.day}-${date.month}-${date.year}, ${bags} чувала`
    );
    // Изпращане на данните към базата
  };

  const isValidDate = (day, month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const inputDate = new Date(year, month - 1, day);
    return day >= 1 && day <= daysInMonth && inputDate <= today;
  };

  const handleDateChange = (e, field) => {
    const value = parseInt(e.target.value, 10);
    setDate((prevDate) => {
      const updatedDate = { ...prevDate, [field]: value };
      if (isValidDate(updatedDate.day, updatedDate.month, updatedDate.year)) {
        return updatedDate;
      }
      return prevDate;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="dayOfMonth" className="block text-gray-700">
          Ден от месеца
        </label>
        <input
          type="number"
          id="dayOfMonth"
          value={date.day}
          onChange={(e) => handleDateChange(e, "day")}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="month" className="block text-gray-700">
          Месец
        </label>
        <input
          type="number"
          id="month"
          value={date.month}
          onChange={(e) => handleDateChange(e, "month")}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-gray-700">
          Година
        </label>
        <input
          type="number"
          id="year"
          value={date.year}
          onChange={(e) => handleDateChange(e, "year")}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="bags" className="block text-gray-700">
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
