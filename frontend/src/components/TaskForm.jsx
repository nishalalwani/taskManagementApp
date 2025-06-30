import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/TaskSlice";

const TaskForm = ({ columnTitle, onClose }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    // Dispatch the new task to Redux store
    dispatch(
      addTask({
        columnTitle,
        title,
        description: desc,
        dueDate,
        priority,
      })
    );

    // Reset form and close modal
    setTitle("");
    setDesc("");
    setDueDate("");
    setPriority("Low");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <label className="block mb-1 font-semibold text-sm">Title</label>
      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1 mb-2 w-full rounded-md"
        required
      />

      <label className="block mb-1 font-semibold text-sm">Description</label>
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-1 mb-4 w-full rounded-md"
      />

      <label className="block mb-1 font-semibold text-sm">Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-1 mb-4 w-full rounded-md"
      />

      <label className="block mb-1 font-semibold text-sm">Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-1 mb-4 w-full rounded-md"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        className="bg-[#5030E533] text-[#5030E5] px-3 py-1 mb-3 rounded-md mr-4 cursor-pointer"
        type="submit"
      >
        Add Task
      </button>

      <button
        className="bg-[#5030E533] text-[#5030E5] px-3 py-1 mb-3 rounded-md cursor-pointer"
        type="button"
        onClick={onClose}
      >
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
