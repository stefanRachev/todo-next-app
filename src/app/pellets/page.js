//src/app/pellets/page.js
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchPellets, deletePellet } from "./utils/apiUtils";
import { useState, useEffect } from "react";

import PelletsForm from "./components/PelletsForm";
import PelletsList from "./components/PelletList";
import EditPelletForm from "./components/EditPelletForm";

export default function PelletsPage() {
  const [pelletsData, setPelletsData] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(true);
  const [editingPellet, setEditingPellet] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (status === "unauthenticated" || !accessToken) {
      router.push("/login");
    }
  }, [accessToken, status, router]);

  useEffect(() => {
    if (isDataChanged && accessToken) {
      fetchPellets(accessToken)
        .then((data) => {
          setPelletsData(data);
          setIsDataChanged(false);
        })
        .catch((error) => {
          console.error("Неуспешно зареждане на данните:", error.message);
        });
    }
  }, [isDataChanged, accessToken]);

  const handlePelletAdded = () => {
    setIsDataChanged(true);
  };

  const handleDeletePellet = async (pelletId) => {
    try {
      await deletePellet(pelletId, accessToken);

      setPelletsData((prevData) =>
        prevData.filter((pellet) => pellet._id !== pelletId)
      );
    } catch (error) {
      console.error("Грешка при изтриване на пелет:", error.message);
    }
  };

  const handlePelletEdit = (pelletId) => {
    const pelletToEdit = pelletsData.find((p) => p._id === pelletId);
    setEditingPellet(pelletToEdit);
  };

  const handleUpdatePellet = (updatedPellet) => {
    setPelletsData((prevData) =>
      prevData.map((pellet) =>
        pellet._id === updatedPellet._id ? updatedPellet : pellet
      )
    );
    setEditingPellet(null);
  };

  if (status === "loading" || status === "unauthenticated") {
    return <div>Зареждане...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Въвеждане на пелети за отопление
        </h1>

        <div className="space-y-4">
          <PelletsForm
            accessToken={accessToken}
            onPelletAdded={handlePelletAdded}
          />
          <PelletsList
            pelletsData={pelletsData}
            onDelete={handleDeletePellet}
            onEdit={handlePelletEdit}
          />
        </div>

        {editingPellet && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Редактиране на пелет</h2>
            <EditPelletForm
              pellet={editingPellet}
              onUpdate={handleUpdatePellet}
              accessToken={accessToken}
            />
          </div>
        )}
      </div>
    </div>
  );
}
