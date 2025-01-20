//src/app/pellets/page.js
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchPellets, deletePellet } from "./utils/apiUtils";
import { useState, useEffect } from "react";
import { calculateTons } from "./utils/calculateTons";

import PelletsForm from "./components/PelletsForm";
import PelletsList from "./components/PelletList";
import EditPelletForm from "./components/EditPelletForm";
import Modal from "./components/Modal";

export default function PelletsPage() {
  const [pelletsData, setPelletsData] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(true);
  const [totalBags, setTotalBags] = useState(0);
  const [totalTons, setTotalTons] = useState(0);
  const [dates, setDates] = useState([]);
  const [editingPellet, setEditingPellet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (isDataChanged && accessToken) {
      fetchPellets(accessToken)
        .then((data) => {
          setPelletsData(data);
          setTotalBags(calculateTons(data).bags);
          setTotalTons(calculateTons(data).tons);
          setDates(calculateTons(data).dates);
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

      setPelletsData((prevData) => {
        const updatedData = prevData.filter(
          (pellet) => pellet._id !== pelletId
        );
        const calculated = calculateTons(updatedData);

        setTotalBags(calculated.bags);
        setTotalTons(calculated.tons);
        setDates(calculated.dates);

        return updatedData;
      });
    } catch (error) {
      console.error("Грешка при изтриване на пелет:", error.message);
    }
  };

  const handlePelletEdit = (pelletId) => {
    const pelletToEdit = pelletsData.find((p) => p._id === pelletId);
    setEditingPellet(pelletToEdit);
    setIsModalOpen(true);
  };

  const handleUpdatePellet = (updatedPellet) => {
    setPelletsData((prevData) => {
      const updatedData = prevData.map((pellet) =>
        pellet._id === updatedPellet._id ? updatedPellet : pellet
      );

      const calculated = calculateTons(updatedData);
      setTotalBags(calculated.bags);
      setTotalTons(calculated.tons);
      setDates(calculated.dates);

      return updatedData;
    });

    setEditingPellet(null);
    closeModal();
  };

  const openModal = (pellet) => {
    setEditingPellet(pellet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPellet(null);
  };

  if (status === "loading" || status === "unauthenticated") {
    return <div>Зареждане...</div>;
  }
  if (status === "unauthenticated") {
    return null;
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
            totalBags={totalBags}
            totalTons={totalTons}
            dates={dates}
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
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
        </Modal>
      </div>
    </div>
  );
}
