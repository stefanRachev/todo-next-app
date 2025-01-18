export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg">
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-xl font-semibold">Редактиране</h2>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              ✖
            </button>
          </div>
          <div className="p-4">{children}</div> 
        </div>
      </div>
    );
  }
  