"use client";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteProduct, editProduct } from "@/utils/api";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Loader from "@/components/Loader";

export default function Purchases() {
  const [productName, setProductName] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const productInputRef = useRef(null);

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
      setLoading(true);
      if (status !== "authenticated" || !accessToken) return;
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError("Неуспешно зареждане на продуктите");
        }
      } catch (err) {
        setError("Грешка при зареждане на продуктите");
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(
          "Зареждането отнема твърде много време. Моля, опитайте отново."
        );
      }
    }, 10000);

    fetchProducts();

    return () => clearTimeout(timeout);
  }, [status, accessToken]);

  useEffect(() => {
    if (editingProductId && productInputRef.current) {
      productInputRef.current.focus();
    }
  }, [editingProductId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productRegex = /^[a-zA-Z0-9а-яА-Я][a-zA-Z0-9а-яА-Я\s.,!?-]*$/;

    if (!productName || productName.trim() === "") {
      setError("Моля, попълнете полето за продукт.");
      setIsSubmitting(false);
      return;
    }

    if (!productRegex.test(productName)) {
      setError("Името на продукта съдържа непозволени символи.");
      setIsSubmitting(false);
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
        setProducts((prevProduct) => [product, ...prevProduct]);
      }

      setProductName("");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    setDeletingProductId(productId);
    setError("");
    setTimeout(async () => {
      try {
        await deleteProduct(productId, accessToken);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setDeletingProductId(null);
      }
    }, 500);
  };

  const startEditing = (product) => {
    setEditingProductId(product._id);
    setProductName(product.productName);
    if (productInputRef.current) {
      productInputRef.current.focus();
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
      {loading && !error && <Loader text="Зареждане на продуктите..." />}

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
              ref={productInputRef}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
                  <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-150"></span>
                  <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-300"></span>
                </span>
              ) : editingProductId ? (
                "Запази промените"
              ) : (
                "Добави в списъка"
              )}
            </button>
          </div>
        </form>

        <div>
          <h2 className="mt-8 text-xl font-bold text-gray-800">
            Списък с продукти
          </h2>
          {products.length === 0 ? (
            <p className="mt-4 text-gray-500">
              Няма добавени продукти. Започнете като добавите нов продукт!
            </p>
          ) : (
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
                      className={`text-red-600 hover:text-red-800 transition-opacity duration-500 ${
                        deletingProductId === product._id ||
                        editingProductId === product._id
                          ? "opacity-50 cursor-not-allowed"
                          : "opacity-100"
                      }`}
                      aria-label="Изтрий"
                      disabled={deletingProductId === product._id}
                    >
                      {deletingProductId === product._id ? (
                        <span
                          className="animate-spin inline-block w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full"
                          role="status"
                        ></span>
                      ) : (
                        <FaTrashAlt className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
