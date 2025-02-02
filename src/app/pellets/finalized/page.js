"use client";
import { Suspense } from "react";  // Импортираме Suspense
import { useSearchParams } from "next/navigation";

const FinalizedSeasonPage = () => {
  const searchParams = useSearchParams(); // Извличаме параметрите от URL

  // Извличаме параметрите от searchParams
  const totalBags = searchParams.get('totalBags');
  const totalTons = searchParams.get('totalTons');
  const dates = searchParams.get('dates');

  // Ако някои параметри липсват, показваме "Loading..."
  if (!totalBags || !totalTons || !dates) {
    return <div>Loading...</div>;
  }

  const parsedDates = JSON.parse(dates); // Преобразуваме string обратно в масив

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Сезонът е завършен!
        </h1>
        <p className="text-lg text-gray-600">
          Вашите данни за пелетите са занулени и сезонът е приключен. Благодарим ви, че използвате нашето приложение.
        </p>

        {/* Рендериране на данните */}
        <div className="mt-6">
          <p className="text-lg font-bold text-gray-800">
            Общо чували: {totalBags}
          </p>
          <p className="text-lg font-bold text-gray-800">
            Общо тонове: {totalTons}
          </p>
          <p className="text-lg font-bold text-gray-800">Дати:</p>
          <ul className="list-disc pl-5">
            {parsedDates.map((date, index) => (
              <li key={index} className="text-gray-600">
                {date}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <button
            onClick={() => window.location.href = "/pellets"} // Пренасочваме с window.location.href
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Върни се в пелетите
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FinalizedSeasonPage />
    </Suspense>
  );
}
