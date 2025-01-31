"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">
        {session?.user?.name ? session.user.name : session?.user?.email}
      </h1>

      {session?.user?.image && (
        <Image
          src={session?.user?.image}
          alt={session?.user?.name}
          width={72}
          height={72}
          className="rounded-full"
        />
      )}

      <div className="text-center my-4">
        <p className="text-lg">
          <strong>Успешно влязохте в системата!</strong>
        </p>
        <p className="text-sm mt-2">
          Запомнете <strong>имейл адреса</strong> си:{" "}
          <span className="text-blue-600">{session?.user?.email}</span> и{" "}
          <strong>паролата</strong> си. За бъдещо влизане в системата ще можете
          да достъпвате данните, които сте въвели, от всяко устройство.
        </p>
      </div>
      <Link href="/change-password">
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Промени паролата си
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
