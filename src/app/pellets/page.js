  //src/app/pellets/page.js
  "use client";

  import { useSession } from "next-auth/react";
  import { useRouter } from "next/navigation";
  import { fetchPellets } from "./utils/apiUtils";
  import { useState, useEffect } from "react";

  import PelletsForm from "./components/PelletsForm";
  import PelletsList from "./components/PelletList";

  export default function PelletsPage() {
    const [pelletsData, setPelletsData] = useState([]);
    const [isDataChanged, setIsDataChanged] = useState(true);

    const { data: session, status } = useSession();
    const router = useRouter();
    const accessToken = session?.user?.accessToken;

    useEffect(() => {
      if (isDataChanged) {
        fetchPellets(accessToken).then((data) => {
          setPelletsData(data);
          setIsDataChanged(false);
        });
      }
    }, [isDataChanged, accessToken]);

    // const onPelletAdded = async () => {
    //   try {
    //     const updatedPellets = await fetchPellets(accessToken); 
    //     setPelletsData(updatedPellets); 
    //   } catch (error) {
    //     console.error("Грешка при обновяване на пелетите:", error);
    //   }
    // };

    const handlePelletAdded = () => {
      setIsDataChanged(true);
    };

    if (status === "unauthenticated") {
      router.push("/login");
      return null;
    }

    if (status === "loading") {
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
            <PelletsList pelletsData={pelletsData} />
          </div>
        </div>
      </div>
    );
  }
