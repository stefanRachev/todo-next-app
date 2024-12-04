"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const searchParams = useSearchParams();
  const errorParams = searchParams.get("error");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
console.log(errorParams);

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
      console.log(result);
      console.log(errorParams);
      if (result?.error) {
        console.log(result.error);

        setError(result.error);
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("Login error: ", error);
      setError("Нещо се обърка при входа. Моля, опитайте отново.");
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
            defaultValue={errorParams || ""}
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
        <button
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 mb-2"
          onClick={() => signIn("google")}
        >
          Вход с Google
        </button>
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={() => signIn("github")}
        >
          Вход с GitHub
        </button>
        <div className="text-center text-gray-500 mt-4">- или -</div>
        <a
          href="/register"
          className="block text-center text-blue-500 hover:underline mt-2"
        >
          Регистрирайте се тук
        </a>
      </div>
    </div>
  );
};

export default Login;
