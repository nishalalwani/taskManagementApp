import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import {
  Pencil,
  Link2,
  Plus,
  Filter,
  CalendarDays,
  Share2,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";
import user1 from "../assets/images/user1.png";
import user2 from "../assets/images/user2.png";
import user3 from "../assets/images/user3.png";
import user4 from "../assets/images/user4.png";
import menu from "../assets/icons/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { moveTask, setFilter } from "../features/tasks/TaskSlice";

const TaskBoard = ({ initialColumns }) => {
  const users = [user1, user2, user3, user4];
  const columns = useSelector((state) => state.tasks.columns);
  const priorityFilter = useSelector((state) => state.tasks.filter.priority);
  const dateFilter = useSelector((state) => state.tasks.filter.date);

  const dispatch = useDispatch();

  const onDragStart = (e, fromColTitle, taskIndex) => {
    e.dataTransfer.setData(
      "taskData",
      JSON.stringify({ fromColTitle, taskIndex })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, toColTitle) => {
    e.preventDefault();
    const taskData = JSON.parse(e.dataTransfer.getData("taskData"));
    const { fromColTitle, taskIndex } = taskData;

    dispatch(moveTask({ fromColTitle, toColTitle, taskIndex }));
  };

  return (
    <div className="flex-1 overflow-y-auto pt-30 px-14 pb-6">
      {/* Header & Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-5xl font-semibold text-black">Mobile App</h1>
          <div className="flex items-center gap-2 mt-3 pl-3">
            <button className="bg-[#5030E533] p-1 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center mr-2">
              <Pencil size={16} className="text-[#5030E5]" />
            </button>
            <button className="bg-[#5030E533] p-1 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center">
              <Link2 size={16} className="text-[#5030E5]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mt-3">
            <div className="p-[0.1rem] border border-gray-300 rounded-md cursor-pointer bg-[#5030E533]">
              <Plus size={10} color="#5030E5" />
            </div>
            <button className="text-purple-600 text-[1rem]">Invite</button>
            <div className="flex -space-x-2">
              {users.slice(0, 3).map((user, i) => (
                <img
                  key={i}
                  src={user}
                  alt={`User ${i + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ))}

              {users.length > 3 && (
                <div className="w-10 h-10 rounded-full bg-[#F4D7DA]  text-xs flex items-center justify-center border-2 border-white text-[#D25B68]">
                  +{users.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Controls */}
      <div className="flex justify-between items-center mb-9 mt-11">
        {/* Left Side - Filter & Today */}
        <div className="flex gap-3">
          <div className="relative flex items-center">
            {/* Filter icon on the left */}
            <Filter className="absolute left-2 w-4 h-4 text-gray-500 pointer-events-none" />

            {/* Styled select dropdown */}
            <select
              value={priorityFilter}
              onChange={(e) =>
                dispatch(setFilter({ priority: e.target.value }))
              }
              className="appearance-none bg-white pl-8 pr-8 py-2 border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Chevron icon on the right */}
            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative flex items-center">
            <CalendarDays className="absolute left-2 w-4 h-4 text-gray-500 pointer-events-none" />
            <select
              value={dateFilter}
              onChange={(e) => dispatch(setFilter({ date: e.target.value }))}
              className="appearance-none bg-white pl-8 pr-8 py-2 border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer focus:outline-none"
            >
              <option value="All">All Dates</option>
              <option value="Today">Today</option>
              <option value="ThisWeek">This Week</option>
              <option value="TwoWeeks">2 Weeks</option>
              <option value="OneMonth">1 Month</option>
            </select>
            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Right Side - Share | Divider | Add | Menu */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 bg-white px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700">
            <Share2 className="w-4 h-4 text-gray-500 mr-1" />
            Share
          </button>

          <div className="h-5 w-px bg-gray-300" />

          <img src={menu} alt="Menu Icon" />

          <button className="p-2 rounded-md hover:bg-gray-100">
            <LayoutGrid size={20} className=" text-gray-500" />
          </button>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns
          .map((col) => {
            const filteredTasks = col.tasks.filter((task) => {
              // Priority filter
              const matchesPriority =
                priorityFilter === "All" || task.priority === priorityFilter;

              // Date filter
              const matchesDate = (() => {
                if (dateFilter === "All") return true;
                if (!task.dueDate) return false;

                const taskDate = new Date(task.dueDate);
                taskDate.setHours(0, 0, 0, 0);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (dateFilter === "Today") {
                  return taskDate.getTime() === today.getTime();
                }

                if (dateFilter === "ThisWeek") {
                  const dayOfWeek = today.getDay(); // Sunday = 0
                  const startOfWeek = new Date(today);
                  startOfWeek.setDate(today.getDate() - dayOfWeek);
                  startOfWeek.setHours(0, 0, 0, 0);

                  const endOfWeek = new Date(startOfWeek);
                  endOfWeek.setDate(startOfWeek.getDate() + 6);
                  endOfWeek.setHours(23, 59, 59, 999);

                  return taskDate >= startOfWeek && taskDate <= endOfWeek;
                }

                if (dateFilter === "TwoWeeks") {
                  const endDate = new Date(today);
                  endDate.setDate(today.getDate() + 14);
                  endDate.setHours(23, 59, 59, 999);

                  return taskDate >= today && taskDate <= endDate;
                }

                if (dateFilter === "OneMonth") {
                  const endDate = new Date(today);
                  endDate.setMonth(today.getMonth() + 1);
                  endDate.setHours(23, 59, 59, 999);

                  return taskDate >= today && taskDate <= endDate;
                }

                return true; // fallback
              })();

              return matchesPriority && matchesDate;
            });

            return { ...col, tasks: filteredTasks };
          })
          .map((col) => (
            <TaskColumn
              key={col.title}
              column={col}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskBoard;
