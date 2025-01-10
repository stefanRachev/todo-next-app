"use client";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MemoPage() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (status !== "authenticated" || !accessToken) return;

      const response = await fetch("/api/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        setError("Неуспешно зареждане на задачите");
      }
    };

    fetchTasks();
  }, [status, accessToken]);

  const addTask = async () => {
    if (!taskText) {
      setError("Моля, въведете текст за задачата.");
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ taskName: taskText }),
      });

      if (!response.ok) {
        throw new Error("Неуспешно създаване на задачата");
      }

      const { task } = await response.json();

      setTasks((prevTasks) => [task, ...prevTasks]);

      setTaskText("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  

  if (status === "loading") {
    return <div>Зареждам сесията...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мемо задачи</h1>
      <div className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Добави задача..."
           maxLength="43"
          className="border p-2 rounded w-full"
        />
        {taskText.length >= 43 && (
          <p className="text-red-500 text-sm">Максимум 43 символа!</p>
        )}
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Добави
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2 flex-wrap">
        {tasks.map((task, index) => (
          <li key={task._id || index} className="border p-2 rounded">
            <p className="font-semibold truncate">{task.taskName}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(task)}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Редактирай"
              >
                <FaPencilAlt className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 hover:text-red-800"
                aria-label="Изтрий"
              >
                <FaTrashAlt className="h-5 w-5" />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              Създадена на:{" "}
              {new Date(task.createdAt).toLocaleDateString("bg-BG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
