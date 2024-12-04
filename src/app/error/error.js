// src/app/error.js
import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div>
      <h1>Грешка при влизането</h1>
      {error ? <p>Грешка: {error}</p> : <p>Неочаквана грешка. Моля, опитайте отново.</p>}
    </div>
  );
};

export default ErrorPage;