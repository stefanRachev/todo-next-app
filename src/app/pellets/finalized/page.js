// src/app/pellets/finalized/page.js
import React from 'react';

const FinalizedSeasonPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Сезонът е завършен!
        </h1>
        <p className="text-lg text-gray-600">
          Вашите данни за пелетите са занулени и сезонът е приключен. Благодарим ви, че използвате нашето приложение.
        </p>
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Върни се в пелетите
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalizedSeasonPage;
