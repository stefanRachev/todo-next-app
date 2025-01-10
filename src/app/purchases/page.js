"use client";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteProduct, editProduct } from "@/utils/api";

export default function Purchases() {
  const [productName, setProductName] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (status !== "authenticated" || !accessToken) return;
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  }, [status, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productName || productName.trim() === "") {
      setError("Моля, попълнете полето за продукт.");
      setLoading(false);
      return;
    }

    try {
      if (editingProductId) {
      
        const updatedProduct = await editProduct(
          editingProductId,
          { productName },
          accessToken
        );

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId ? updatedProduct : product
          )
        );
        setEditingProductId(null); 
      } else {
        
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ productName }),
        });

        if (!response.ok) {
          throw new Error("Неуспешно създаване на покупка");
        }

        const { product } = await response.json();
        setProducts((prevProduct) => [...prevProduct, product]);
      }

      setProductName(""); 
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId, accessToken);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const startEditing = (product) => {
    setEditingProductId(product._id);
    setProductName(product.productName);
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
              maxLength="31"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {productName.length >= 31 && (
              <p className="text-red-500 text-sm">Максимум 31 символа!</p>
            )}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              {editingProductId ? "Запази промените" : "Добави в списъка"}
            </button>
          </div>
        </form>

        <div>
          <h2 className="mt-8 text-xl font-bold text-gray-800">
            Списък с продукти
          </h2>
          <ul className="mt-4 flex-wrap">
            {products.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between mb-2 border-b pb-2"
              >
                <div className="truncate">{product.productName}</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(product)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Редактирай"
                  >
                    <FaPencilAlt className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Изтрий"
                  >
                    <FaTrashAlt className="h-5 w-5" />
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
