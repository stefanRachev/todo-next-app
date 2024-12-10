// app/page.js
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-4xl px-6 py-12">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-10">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Добре дошли в нашето приложение!
            </h1>
            <p className="text-gray-600 mb-6">
              Това е страница, в която можете да водите бележки за ежедневните
              си задачи!
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              <div className="p-4 bg-blue-100 rounded-lg text-center">
                <h2 className="text-xl font-medium text-blue-700">
                  Пазаруване на стоки
                </h2>
                <p className="text-gray-500 mt-2">
                  Тук можете да създадете списък с желаните стоки, да добавяте
                  нови артикули, да ги маркирате като купени или да ги
                  премахвате от списъка.
                </p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg text-center">
                <h2 className="text-xl font-medium text-green-700">
                  Планиране на фитнес тренировки
                </h2>
                <p className="text-gray-500 mt-2">
                  Тук можете да създавате упражнения, които да комбинирате в
                  персонализиран тренировъчен сплит, изцяло създаден от вас.
                  Можете също така да избирате от вече създадените упражнения в
                  системата и да ги добавяте към вашия план.
                </p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg text-center">
                <h2 className="text-xl font-medium text-yellow-700">
                  Разни задачи
                </h2>
                <p className="text-gray-500 mt-2">
                  Тук можете да добавяте всякакви бъдещи задачи, които трябва да
                  изпълните, за да не ги забравите. Можете да ги маркирате като
                  завършени, когато бъдат изпълнени.
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              За да използвате пълния потенциал на приложението, е необходимо да
              се регистрирате и да влезнете с акунта си. Ако вече имате акаунт,
              можете да влезете директно.
            </p>

            <div className="flex space-x-4">
              <a
                href="/register"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Регистрация
              </a>
              <a
                href="/login"
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
              >
                Вход
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
