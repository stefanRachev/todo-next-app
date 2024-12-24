"use client";



import { useState, useEffect } from "react";
//import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Purchases() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const router = useRouter();

  const { data: session, status } = useSession();

  
  const user = session?.user?.id;
  
  
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.id}`,
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
    
  }, [status,user]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productName) {
      setError("Моля, попълнете полето за продукт.");
      return;
    }
    
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.id}`,
        },
        body: JSON.stringify({ productName, quantity }),
      });
      
      if (!response.ok) {
        throw new Error("Неуспешно създаване на покупка");
      }
      
      setProductName("");
      setQuantity("");
      setError("");
      alert("Покупката беше добавена успешно!");
    } catch (err) {
      setError(err.message);
    }
  };
  
  if (status === "loading") {
    return <div>Зареждам сесията...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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

          <div>
            <label htmlFor="quantity" className="block text-gray-700">
              Брой:
            </label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Въведете количество"
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
              <li key={product._id} className="mb-2">
                {product.productName} - {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
