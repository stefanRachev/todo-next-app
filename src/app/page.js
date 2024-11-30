
// app/page.js

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Добре дошли в нашето приложение!
          </h1>
          <p className="text-gray-600 mb-6">
            Това е елементарна респонсивна страница, създадена с Tailwind CSS.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-blue-100 rounded-lg text-center">
              <h2 className="text-xl font-medium text-blue-700">
                Функционалност 1
              </h2>
              <p className="text-gray-500 mt-2">
                Описание на функционалност 1.
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <h2 className="text-xl font-medium text-green-700">
                Функционалност 2
              </h2>
              <p className="text-gray-500 mt-2">
                Описание на функционалност 2.
              </p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg text-center">
              <h2 className="text-xl font-medium text-yellow-700">
                Функционалност 3
              </h2>
              <p className="text-gray-500 mt-2">
                Описание на функционалност 3.
              </p>
            </div>
          </div>
        </div>
      </div>
 
    </div>

</>
  );
}
