"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/SocialLogin";

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlerSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (!name || !email || !password) {
        setLoading(false);
        return setErrorMessage("Please fill out all fields.");
      }

      if (password !== confirmPassword) {
        setLoading(false);
        return setErrorMessage("Passwords do not match.");
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
        Регистрация
      </h1>
      <form
        onSubmit={handlerSubmit}
        className="my-5 flex flex-col items-center p-5 border border-gray-200 rounded-md max-w-lg mx-auto w-full space-y-4 sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <div className="w-full flex flex-col items-start">
          <label htmlFor="name" className="mb-1 text-sm font-medium">
            Име
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border p-2 w-full border-gray-500 rounded"
          />
        </div>
        <div className="w-full flex flex-col items-start">
          <label htmlFor="email" className="mb-1 text-sm font-medium">
            Имейл Адрес
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border p-2 w-full border-gray-500 rounded"
          />
        </div>
        <div className="w-full flex flex-col items-start">
          <label htmlFor="password" className="mb-1 text-sm font-medium">
            Парола
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border p-2 w-full border-gray-500 rounded"
          />
        </div>
        <div className="w-full flex flex-col items-start">
          <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium">
            Птвърди Паролата
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="border p-2 w-full border-gray-500 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
          disabled={loading}
        >
          {loading ? "Регистрира се..." : "Регистрация"}
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
      )}
      <SocialLogin />
      </div>
  );
};

export default RegistrationForm;    
