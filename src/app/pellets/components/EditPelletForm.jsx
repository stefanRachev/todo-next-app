import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { editPellet } from "../utils/apiUtils";

export default function EditPelletForm({ pellet, onUpdate, accessToken }) {
  const [formData, setFormData] = useState({
    date: pellet.date,
    bags: pellet.bags,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedPellet = await editPellet(pellet._id, formData, accessToken);
      onUpdate(updatedPellet);
    } catch (error) {
      console.error("Грешка при редактиране:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-gray-700">
          Дата
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="bags" className="block text-gray-700">
          Брой чували
        </label>
        <input
          type="number"
          name="bags"
          id="bags"
          value={formData.bags}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        <FaSave className="mr-2" /> Запазване
      </button>
    </form>
  );
}
