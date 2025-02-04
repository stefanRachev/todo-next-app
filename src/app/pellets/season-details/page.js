// src/app/season-details/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePellets } from "../context/PelletsContext";

export default function SeasonDetailsPage() {
  const { data: session, status } = useSession();
  const { seasonData, setSeasonData } = usePellets(); 
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
   
    if (seasonData) {
      setLoading(false);
    }
  }, [status, router, seasonData]);

  if (loading) {
    return <div>Зареждам сезона...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Подробности за сезона
        </h1>
        <p className="text-lg text-gray-600">Ето информацията за текущия сезон:</p>

        <div className="mt-6">
          <p className="text-lg font-bold text-gray-800">
            Първа и последна дата на сезона:
            <span className="ml-2 text-gray-600 block">
              {seasonData.firstDate} - {seasonData.lastDate}
            </span>
          </p>
          <p className="text-lg font-bold text-gray-800">
            Общо тонове: {seasonData.totalTons} кг
          </p>
          <p className="text-lg font-bold text-gray-800">
            Текущи чували: {seasonData.totalBags} броя
          </p>
          <p className="text-lg font-bold text-gray-800">
            Дати за достигане на тон:
          </p>
          <ul className="list-disc pl-5">
            {seasonData.dates.length > 0 &&
              seasonData.dates.map((date, index) => (
                <li key={index} className="text-gray-600">
                  {date}
                </li>
              ))}
          </ul>

          <div className="mt-6">
            <button
              onClick={() => router.push("/some-other-page")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Отиди на друга страница
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
