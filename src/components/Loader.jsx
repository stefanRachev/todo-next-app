export default function Loader({ text, size = "w-16 h-16" }) {
    return (
      <div className="loader fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div
          className={`${size} border-4 border-dashed border-gray-400 rounded-full animate-spin`}
        ></div>
        {text && <p className="text-white mt-4">{text}</p>}
      </div>
    );
  }
      