"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Purchases() {
  const [productName, setProductName] = useState("");

  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user?.email;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (status !== "authenticated") return;
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.email}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError("Неуспешно зареждане на продуктите");
      }
    };

    fetchProducts();
  }, [status, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productName) {
      setError("Моля, попълнете полето за продукт.");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.email}`,
        },
        body: JSON.stringify({ productName }),
      });

      if (!response.ok) {
        throw new Error("Неуспешно създаване на покупка");
      }

      const { product } = await response.json();
      setProducts((prevProduct) => [...prevProduct, product]);

      setProductName("");
     
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div>Зареждам сесията...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {loading && (
        <div className="loader flex justify-center items-center w-full h-full fixed top-0 left-0 bg-gray-500 bg-opacity-50 z-50">
          <div
            className="spinner-border animate-spin inline-block w-12 sm:w-16 md:w-24 lg:w-32 xl:w-40 border-4 border-t-4 border-gray-200 rounded-full"
            role="status"
          >
            <span className="sr-only">Зареждане...</span>
          </div>
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Създаване на списък за покупки
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="product-name" className="block text-gray-700">
              Име на продукта:
            </label>
            <input
              type="text"
              id="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Въведете име на продукта"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Добави в списъка
            </button>
          </div>
        </form>

        <div>
          <h2 className="mt-8 text-xl font-bold text-gray-800">
            Списък с продукти
          </h2>
          <ul className="mt-4">
            {products.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between mb-2 border-b pb-2"
              >
                <div>
                  {product.productName}
                </div>
                <div className="flex space-x-2">
                
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:underline"
                  >
                    Промяна
                  </button>
                 
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Изтриване
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
