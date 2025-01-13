    // src/app/pellets/components/PelletsForm.js
"use client";
import { useState } from "react";

export default function PelletsForm() {
  const [pelletAmount, setPelletAmount] = useState(0);
  const [unitCost, setUnitCost] = useState(0);

  const handleAmountChange = (e) => {
    setPelletAmount(e.target.value);
  };

  const handleCostChange = (e) => {
    setUnitCost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Amount:", pelletAmount, "Unit Cost:", unitCost);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Въвеждане на пелети</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pelletAmount" className="block text-gray-600 font-medium mb-2">
            Количество пелети (кг)
          </label>
          <input
            type="number"
            id="pelletAmount"
            value={pelletAmount}
            onChange={handleAmountChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Въведете количество"
          />
        </div>
        <div>
          <label htmlFor="unitCost" className="block text-gray-600 font-medium mb-2">
            Цената на единица пелети (лв/кг)
          </label>
          <input
            type="number"
            id="unitCost"
            value={unitCost}
            onChange={handleCostChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Въведете единична цена"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Запиши
        </button>
      </form>
    </div>
  );
}
