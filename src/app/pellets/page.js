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
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Modal from "./components/Modal";
import Loader from "@/components/Loader";

export default function PelletsPage() {
  const [pelletsData, setPelletsData] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBags, setTotalBags] = useState(0);
  const [totalTons, setTotalTons] = useState(0);
  const [dates, setDates] = useState([]);
  const [editingPellet, setEditingPellet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingPellet, setIsDeletingPellet] = useState(null);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setError("Зареждането отне твърде много време. Опитайте отново.");
        setIsLoading(false);
      }
    }, 10000);

    if (isDataChanged && accessToken) {
      setIsLoading(true);
      setError(null);
      fetchPellets(accessToken)
        .then((data) => {
          setPelletsData(data);
          const calculated = calculateTons(data);
          setTotalBags(calculated.bags);
          setTotalTons(calculated.tons);
          setDates(calculated.dates);
          setIsDataChanged(false);
        })
        .catch((error) => {
          console.error("Грешка при зареждане на пелетите:", error);
          setError("Неуспешно зареждане на данните: " + error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return () => clearTimeout(timer);
  }, [isDataChanged, accessToken]);

  const handlePelletAdded = () => {
    setIsDataChanged(true);
  };

  const handleDeletePellet = async (pelletId) => {
    setIsDeletingPellet(pelletId);
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
      setError(null);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } catch (error) {
      setError("Грешка при изтриване на пелет: " + error.message);
    } finally {
      setIsDeletingPellet(null);
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

  const finalizeSeason = () => {
   
    router.push('/pellets/finalized');
  };

  if (status === "loading") {
    return <div>Зареждам сесията...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {isLoading && <Loader text="Зареждам данни за пелети..." />}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Въвеждане на пелети за отопление
        </h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="space-y-4">
          <button
            onClick={finalizeSeason}
            className="w-full py-2 px-4 mt-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600"
          >
            Приключи сезона и занули всички пелети
          </button>
          <PelletsForm
            accessToken={accessToken}
            onPelletAdded={handlePelletAdded}
            setError={setError}
          />
          <PelletsList
            pelletsData={pelletsData}
            onDelete={handleDeletePellet}
            onEdit={handlePelletEdit}
            totalBags={totalBags}
            totalTons={totalTons}
            dates={dates}
            error={error}
            isDeletingPellet={isDeletingPellet}
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
                setError={setError}
              />
            </div>
          )}
        </Modal>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
