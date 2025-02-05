"use client";

import { usePellets } from "../context/PelletsContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createSeason } from "../utils/apiUtils";
import { deleteAllPellets } from "../utils/apiUtils";

export default function FinalizedSeasonPage() {
  const { totalBags, totalTons, dates, firstDate, lastDate } = usePellets();
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
      const seasonData = {
        totalBags,
        totalTons,
        dates,
        firstDate,
        lastDate,
      };

      const result = await createSeason(seasonData, accessToken);
      console.log("Сезонът е създаден успешно:", result);

      await deleteAllPellets(accessToken);
      console.log("Пелетите са изтрити успешно.");

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
          <p className="text-lg font-bold text-gray-800">
            Първа и последна дата на сезона:
            <span className="ml-2 text-gray-600 block">
              {firstDate} - {lastDate}
            </span>
          </p>
          <p className="text-lg font-bold text-gray-800">
            Общо тонове: {totalTons} кг
          </p>
          <p className="text-lg font-bold text-gray-800">
            Текущи чували: {totalBags} броя
          </p>
          <p className="text-lg font-bold text-gray-800">
            Дати за достигане на тон:
          </p>
          <ul className="list-disc pl-5">
            {parsedDates.length > 0 &&
              parsedDates.map((date, index) => (
                <li key={index} className="text-gray-600">
                  {date}
                </li>
              ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Запази и приключи сезона
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/pellets")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Върни се в пелетите
          </button>
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
