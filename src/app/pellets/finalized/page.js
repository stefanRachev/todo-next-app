"use client";

import { usePellets } from "../context/PelletsContext";

export default function FinalizedSeasonPage() {
  const { totalBags, totalTons, dates } = usePellets();

  console.log(totalBags);
  console.log(totalTons);
  console.log(dates);

  if (totalBags === undefined || totalTons === undefined) {
    return <div>Loading...</div>;
  }

  const parsedDates = dates;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Сезонът е завършен!
        </h1>
        <p className="text-lg text-gray-600">
          Вашите данни за пелетите са занулени и сезонът е приключен. Благодарим
          ви, че използвате нашето приложение.
        </p>

        <div className="mt-6">
          <p className="text-lg font-bold text-gray-800">
            Общо чували: {totalBags}
          </p>
          <p className="text-lg font-bold text-gray-800">
            Общо тонове: {totalTons}
          </p>
          <p className="text-lg font-bold text-gray-800">Дати:</p>
          <ul className="list-disc pl-5">
            {parsedDates.length > 0 &&
              parsedDates.map((date, index) => (
                <li key={index} className="text-gray-600">
                  {date}
                </li>
              ))}
          </ul>
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
    </div>
  );
}
