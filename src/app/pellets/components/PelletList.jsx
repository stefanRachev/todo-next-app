"use client";
import { useEffect, useState } from "react";

export default function PelletsList() {
  const [pellets, setPellets] = useState([]);

  useEffect(() => {
    const fetchPellets = async () => {
      try {
        const response = await fetch("/api/pellets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Грешка при зареждане на данните!");
        }

        const data = await response.json();
        console.log(data);
        
        setPellets(data);
      } catch (error) {
        console.error("Грешка:", error.message);
      }
    };

    fetchPellets();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Добавени пелети</h2>
      <ul className="space-y-2">
        {pellets.map((pellet) => (
          <li
            key={pellet._id}
            className="p-4 border border-gray-300 rounded-md shadow-sm"
          >
            <p>Дата: {new Date(pellet.date).toLocaleDateString()}</p>
            <p>Брой чували: {pellet.bags}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
