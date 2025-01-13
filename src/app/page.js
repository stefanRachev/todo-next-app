"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="w-full max-w-4xl px-6 py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mb-8 text-center">
            Добре дошли в нашето приложение!
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            <div className="p-6 bg-blue-100 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex flex-col justify-between h-full">
              <h2 className="text-xl sm:text-2xl font-medium text-blue-700">
                Пазаруване на стоки
              </h2>
              <p className="text-gray-500 mt-2 mb-4">
                Тук можете да създадете списък с желаните стоки.
              </p>
              <Link
                href="/purchases"
                className="text-blue-600 hover:text-blue-800 transition-all"
              >
                Вижте повече
              </Link>
            </div>

            <div className="p-6 bg-green-100 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex flex-col justify-between h-full">
              <h2 className="text-xl sm:text-2xl font-medium text-green-700">
                Брояч на пелети и разход
              </h2>
              <p className="text-gray-500 mt-2 mb-4">
                Следете ефективно разхода на пелети за отопление. Добавяйте
                броя на използваните торби, изчислявайте дневния и общия разход.
              </p>
              <Link
                href="/pellets"
                className="text-green-600 hover:text-green-800 transition-all"
              >
                Вижте повече
              </Link>
            </div>

            <div className="p-6 bg-yellow-100 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex flex-col justify-between h-full">
              <h2 className="text-xl sm:text-2xl font-medium text-yellow-700">
                Разни задачи
              </h2>
              <p className="text-gray-500 mt-2 mb-4">
                Тук можете да добавяте бъдещи задачи.
              </p>
              <Link
                href="/tasks"
                className="text-yellow-600 hover:text-yellow-800 transition-all"
              >
                Вижте повече
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
