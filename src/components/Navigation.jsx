"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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

        {/* Линкове */}
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
          <Link
            href="/about"
            className="block py-2 px-4 hover:bg-blue-600"
            onClick={() => setIsOpen(false)}
          >
            За нас
          </Link>
          <Link
            href="/services"
            className="block py-2 px-4 hover:bg-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Услуги
          </Link>
          <Link
            href="/contact"
            className="block py-2 px-4 hover:bg-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Контакти
          </Link>
        </div>
      </div>
    </nav>
  );
}

