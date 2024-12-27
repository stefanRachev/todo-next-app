"use client";

import { useState } from "react";

export default function MemoPage() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(), 
      text: taskText,
      createdAt: new Date().toLocaleString(), 
    };

    setTasks([newTask, ...tasks]);
    setTaskText(""); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мемо задачи</h1>
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

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 rounded">
            <p className="font-semibold">{task.text}</p>
            <span className="text-sm text-gray-500">
              Създадена на: {task.createdAt}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
