import { FaTrashAlt } from "react-icons/fa";

export default function PelletsList({ pelletsData, onDelete }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Добавени пелети</h2>
      {pelletsData.length === 0 ? (
        <div className="text-gray-500 italic">
          Няма данни за разход на пелети за момента.
        </div>
      ) : (
        <ul className="space-y-2">
          {pelletsData.map((pellet) => (
            <li
              key={pellet._id}
              className="p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <div>
                <p>Дата: {new Date(pellet.date).toLocaleDateString()}</p>
                <p>Брой чували: {pellet.bags}</p>
              </div>
              <button
                onClick={() => onDelete(pellet._id)}
                className="text-red-600 hover:text-red-800"
                aria-label="Изтрий"
              >
                <FaTrashAlt className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
