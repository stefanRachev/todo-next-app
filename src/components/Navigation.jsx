"use client";

import { useState } from "react";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  return (
    <>
      {session && (
        <header className="bg-gray-800 text-white py-2 px-4 text-sm flex justify-between items-center">
          <span>Добре дошли, {session.user.name}!</span>
          <button
            onClick={async () => {
              await signOut({ redirectTo: "/" });
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          >
            Изход
          </button>
        </header>
      )}
      <nav className="bg-blue-500 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            MyApp
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden block focus:outline-none"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <div
            className={`absolute top-16 left-0 w-full bg-blue-500 md:static md:flex md:items-center md:space-x-6 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link
              href="/"
              className="block py-2 px-4 hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Начало
            </Link>
            {isLoading ? (
              <span className="block py-2 px-4">Зареждане...</span>
            ) : session ? (
              <div className="flex flex-col md:flex-row md:space-x-4 items-center justify-center">
              <Link
                href="/purchases"
                className="block py-2 px-4 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded mb-2 md:mb-0"
                onClick={() => setIsOpen(false)}
              >
                Пазаруване на стоки
              </Link>
              <Link
                href="/pellets"
                className="block py-2 px-4 bg-green-100 text-green-700 hover:bg-green-200 rounded mb-2 md:mb-0"
                onClick={() => setIsOpen(false)}
              >
                Брояч на пелети и разход
              </Link>
              <Link
                href="/tasks"
                className="block py-2 px-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded mb-2 md:mb-0"
                onClick={() => setIsOpen(false)}
              >
                Разни задачи
              </Link>
              <Link
                href="/profile"
                className="block py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded mb-2 md:mb-0"
                onClick={() => setIsOpen(false)}
              >
                Акаунт
              </Link>
            </div>
            
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 px-4 hover:bg-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Вход
                </Link>
                <Link
                  href="/register"
                  className="block py-2 px-4 hover:bg-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
