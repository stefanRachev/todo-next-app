//src/app/pellets/page.js

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PelletsForm from "./components/PelletsForm";
import PelletsList from "./components/PelletList";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Въвеждане на пелети за отопление
        </h1>

        <div className="space-y-4">
          <PelletsForm />
          <PelletsList />
        </div>
      </div>
    </div>
  );
}
