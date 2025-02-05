// src/app/season-details/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchSeasons } from "../utils/apiUtils";

export default function SeasonDetailsPage() {
  const { data: session, status } = useSession();
  const [seasonData, setSeasonData] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState(null);
  const router = useRouter();

  const accessToken = session?.user?.accessToken;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (accessToken) {
      fetchSeasons(accessToken)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else if (data.message) {
            setMessages(data.message);
            setSeasonData([]);
          } else {
            setSeasonData(data);
            setError(null);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Грешка при зареждане на сезона:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [accessToken]);

  if (loading) {
    return <div>Зареждам сезона...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Грешка</h1>
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(seasonData) || seasonData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Няма данни</h1>
          <p className="text-lg text-gray-600">
            {messages ? messages : "Няма налични сезони за този потребител."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Подробности за сезона
        </h1>
        <p className="text-lg text-gray-600">
          Ето информацията за изминали сезони на пелетите ви:
        </p>

        <div className="mt-6">
          {seasonData.map((season, index) => (
            <div key={index} className="mt-6">
              <p className="text-lg font-bold text-gray-800">
                Първа и последна дата на сезона:
                <span className="ml-2 text-gray-600 block">
                  {season.firstDate} - {season.lastDate}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-800">
                Общо тонове: {season.totalTons} кг
              </p>
              <p className="text-lg font-bold text-gray-800">
                Текущи чували: {season.totalBags} броя
              </p>
              <p className="text-lg font-bold text-gray-800">
                Дати за достигане на тон:
              </p>
              <ul className="list-disc pl-5">
                {season.dates.map((date, index) => (
                  <li key={index} className="text-gray-600">
                    {date}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-6">
            <button
              onClick={() => router.push("/pellets/finalized")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Отиди детаили за пелети
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
