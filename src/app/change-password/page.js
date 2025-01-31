"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const isExternalProvider =
    session?.user?.authProvider &&
    session?.user?.authProvider !== "credentials";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!session?.user?.email) {
      return setMessage(
        "Грешка: Не може да бъде намерен имейлът на потребителя."
      );
    }

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    });

    const data = await res.json();
    if (!res.ok) return setMessage(data.message);

    setMessage("Паролата е сменена успешно!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    setTimeout(() => {    
      signOut({ redirect: false }); 
      router.push("/login"); 
    }, 2000);
  };

  if (status === "loading") {
    return <div>Зареждам сесията...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        type="email"
        value={session?.user?.email || ""}
        readOnly
        className="w-full p-2 border rounded bg-gray-100 text-gray-500"
      />
      {!isExternalProvider && (
        <>
          <input
            type="password"
            placeholder="Текуща парола"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Нова парола"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Потвърди нова парола"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </>
      )}
      {isExternalProvider ? (
        <p className="text-center text-red-500">
          Не може да сменяте паролата си, ако сте логнати с Google или GitHub.
        </p>
      ) : (
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Смени паролата
        </button>
      )}

      {message && (
        <p
          className={`text-center ${
            message.includes("успешно") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
