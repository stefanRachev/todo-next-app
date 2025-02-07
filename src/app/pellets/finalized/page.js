"use client";

import { usePellets } from "../context/PelletsContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createSeason } from "../utils/apiUtils";
import { deleteAllPellets } from "../utils/apiUtils";

export default function FinalizedSeasonPage() {
  const {
    totalBags,
    totalTons,
    dates,
    firstDate,
    lastDate,
    setTotalBags,
    setTotalTons,
    setDates,
    setFirstDate,
    setLastDate,
  } = usePellets();
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken;
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const parsedDates = dates;

  const saveAndEndSeason = async () => {
    try {
      if (!firstDate) {
        alert("Нямате нито една торба, сезонът не може да бъде приключен.");
        return;
      }

      const seasonData = {
        totalBags,
        totalTons,
        dates,
        firstDate,
        lastDate,
      };

      const result = await createSeason(seasonData, accessToken);

      await deleteAllPellets(accessToken);

      setTotalBags(0);
      setTotalTons(0);
      setDates([]);
      setFirstDate("");
      setLastDate("");

      router.push("/pellets/season-details");
    } catch (error) {
      console.error("Грешка при приключването на сезона:", error);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleConfirm = () => {
    saveAndEndSeason();
    setShowModal(false);
  };

  if (status === "loading") {
    return <div>Зареждам сесията...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Готов сте да приключите сезона?
        </h1>
        <p className="text-lg text-gray-600">
          Вашите данни за пелетите ще се занулят и ще се запазят само общите
          данни! Благодарим ви, че използвате нашето приложение.
        </p>

        <div className="mt-6">
          <div className="text-lg font-bold text-gray-800">
            {firstDate ? (
              <>
                <p className="text-lg font-bold">
                  Начало:{" "}
                  <span className="text-indigo-500 font-medium whitespace-nowrap">
                    {firstDate}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Край:{" "}
                  <span className="text-indigo-500 font-medium whitespace-nowrap">
                    {lastDate}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-red-600 font-semibold">
                Няма налични данни за този сезон.
              </p>
            )}
          </div>

          <p className="text-lg font-bold">
            Общо тонове:{" "}
            <span className="text-blue-600 font-semibold whitespace-nowrap">
              {totalTons} кг
            </span>
          </p>
          <p className="text-lg font-bold">
            Текущи чували:{" "}
            <span className="text-green-600 font-semibold whitespace-nowrap">
              {totalBags} броя
            </span>
          </p>
          <p className="text-lg font-bold text-gray-800">
            Дати за достигане на тон:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            {parsedDates.length > 0 ? (
              parsedDates.map((date, index) => (
                <li
                  key={index}
                  className="list-disc pl-5 text-blue-600 font-semibold"
                >
                  {date}
                </li>
              ))
            ) : (
              <p className="text-red-600 font-semibold">
                Няма достигнат 1 тон.
              </p>
            )}
          </ul>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
            >
              Запази и приключи сезона
            </button>

            <button
              onClick={() => (window.location.href = "/pellets/season-details")}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600 transition"
            >
              Детайли за сезоните
            </button>

            <button
              onClick={() => (window.location.href = "/pellets")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Върни се в пелетите
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Внимание!</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleModalClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-gray-700">
              Ще приключите сезона и ще изтриете всички пелети. Искате ли да
              продължите?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Отказ
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Потвърдете
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
