import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { calculateTons } from "../utils/calculateTons";

export default function PelletsList({
  pelletsData,
  onDelete,
  onEdit,
  totalBags,
  totalTons,
}) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Добавени пелети</h2>
      {pelletsData.length === 0 ? (
        <div className="text-gray-500 italic">
          Няма данни за разход на пелети за момента.
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p>Общо чували: {totalBags}</p>
            <p>Общ тонаж: {totalTons} т</p>
          </div>
          <ul className="space-y-2">
            {pelletsData.map((pellet) => (
              <li
                key={pellet._id}
                className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>Дата: {new Date(pellet.date).toLocaleDateString()}</p>
                  <p>Брой чували: {pellet.bags}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(pellet._id)}
                    className="text-blue-600 hover:text-blue-800 mt-2 md:mt-0"
                    aria-label="Редактирай"
                  >
                    <FaPencilAlt className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(pellet._id)}
                    className="text-red-600 hover:text-red-800 mt-2 md:mt-0"
                    aria-label="Изтрий"
                  >
                    <FaTrashAlt className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
