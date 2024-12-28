"use client";

import SocialLogin from "@/components/SocialLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError("Моля, попълнете всички полета.");
      return;
    }

    if (password.length < 6) {
      setError("Паролата трябва да е минимум 6 символа.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!!result.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("Login error: ", error);
      setError("Грешни входни данни.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
        Вход в профила
      </h1>
      <form
        onSubmit={handleLogin}
        className="my-5 flex flex-col items-center p-5 border border-gray-200 rounded-md max-w-lg mx-auto w-full space-y-4 sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <div className="w-full flex flex-col items-start">
          <label htmlFor="email" className="mb-1 text-sm font-medium">
            Имейл
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
        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          {loading ? "Влизане..." : "Вход"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
      </form>
      <div className="flex flex-col items-center mt-4">
        <SocialLogin />
        <div className="text-center text-gray-500 mt-4">- Все още не сте се регистрирали ? -</div>
        <Link
          href="/register"
          className="block text-center text-blue-500 hover:underline mt-2"
        >
          Регистрирайте се тук
        </Link>
      </div>
    </div>
  );
};

export default Login;
