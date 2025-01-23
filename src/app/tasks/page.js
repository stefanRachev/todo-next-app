"use client";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteTask, editTask } from "@/utils/api";

export default function MemoPage() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

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

      setIsLoading(true);

      try {
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
      } catch (error) {
        setError("Грешка при зареждането на задачите");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [status, accessToken]);

  const addTask = async () => {
    if (!taskText || taskText.trim() === "") {
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

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, accessToken);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async () => {
    if (!editedTaskText) {
      setError("Моля, въведете текст за задачата.");
      return;
    }

    try {
      const updatedTask = await editTask(
        editingTaskId,
        { taskName: editedTaskText },
        accessToken
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTaskId
            ? { ...task, taskName: updatedTask.taskName }
            : task
        )
      );

      setEditingTaskId(null);
      setEditedTaskText("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditedTaskText(task.taskName);
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
      {isLoading && (
        <div className="loader flex justify-center items-center w-full h-full fixed top-0 left-0 bg-gray-500 bg-opacity-50 z-50">
          <div
            className="spinner-border animate-spin inline-block w-12 sm:w-16 md:w-24 lg:w-32 xl:w-40 border-4 border-t-4 border-gray-200 rounded-full"
            role="status"
          >
            <span className="sr-only">Зареждане...</span>
          </div>
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Добави задача..."
          className="border p-2 rounded w-full"
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Добави
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {tasks.length === 0 ? (
        <div className="text-gray-500 italic">Няма добавени задачи.</div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li key={task._id || index} className="border p-4 rounded">
              {editingTaskId === task._id ? (
                <div>
                  <textarea
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                    className="border p-2 rounded w-full resize-none"
                    rows={Math.min(editedTaskText.split("\n").length || 1, 5)} 
                    placeholder="Редактирай задачата..."
                  ></textarea>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={handleEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Запази
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Откажи
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-semibold break-words">{task.taskName}</p>
                  <div className="flex space-x-2 mt-2">
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
                </div>
              )}
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
      )}
    </div>
  );
}
