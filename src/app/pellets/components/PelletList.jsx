import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

export default function PelletsList({
  pelletsData,
  onDelete,
  onEdit,
  totalBags,
  totalTons,
  dates,
  error,
  isDeletingPellet,
}) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Добавени пелети</h2>
      {error && (
        <div className="text-red-500 italic mb-4">Възникна грешка: {error}</div>
      )}
      {pelletsData.length === 0 ? (
        <div className="text-gray-500 italic">
          Няма данни за разход на пелети за момента.
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p>Чували преди тон: {totalBags}</p>
            <p>Общ тонаж: {totalTons} кг</p>
            <p className="text-gray-700 font-semibold">Достигнат тон на:</p>
            <p className="mt-2 flex flex-col">
              {dates.length > 0
                ? dates.map((date, index) => (
                    <span key={index} className="block">
                      {date}
                    </span>
                  ))
                : "Няма данни"}
            </p>
          </div>
          <ul className="space-y-2">
            {pelletsData.map((pellet) => (
              <li
                key={pellet._id}
                className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>
                    Дата: {new Date(pellet.date).toLocaleDateString("bg-BG")}
                  </p>
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
                    className={`text-red-600 hover:text-red-800 mt-2 md:mt-0 ${
                      isDeletingPellet === pellet._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    aria-label="Изтрий"
                    disabled={isDeletingPellet === pellet._id}
                  >
                    {isDeletingPellet === pellet._id ? (
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
        </>
      )}
    </div>
  );
}
