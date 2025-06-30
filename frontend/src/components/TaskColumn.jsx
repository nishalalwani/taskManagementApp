import React, { useState } from "react";
import { Plus, MoreHorizontal, MessageSquare, FileText } from "lucide-react";
import TaskForm from "./TaskForm";

const TaskColumn = ({ column, onDragStart, onDragOver, onDrop }) => {
  const [showForm, setShowForm] = useState(false);
  console.log(column, "col");
  return (
    <div
      className="bg-[#F5F5F5] p-5 rounded-xl w-full"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.title)}
    >
      {/* Column Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                column.title === "To Do"
                  ? "bg-[#5030E5]"
                  : column.title === "On Progress"
                  ? "bg-[#FFA500]"
                  : column.title === "Done"
                  ? "bg-[#8BC48A]"
                  : "bg-gray-400"
              }`}
            />
            <h2 className="text-sm font-semibold text-gray-700">
              {column.title}
            </h2>
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#E0E0E0] text-gray-500 text-[10px] font-medium">
              {column.tasks.length}
            </span>
          </div>

          {column.title === "To Do" && (
            <div
              className="p-[0.2rem] border border-gray-300 rounded-md cursor-pointer bg-[#5030E533]"
              onClick={() => setShowForm((prev) => !prev)}
            >
              <Plus size={10} color="#5030E5" />
            </div>
          )}
        </div>

        {/* Bottom border indicator */}
        <div
          className="h-[3px] w-full mt-2 mb-5 rounded-full"
          style={{
            backgroundColor:
              column.title === "To Do"
                ? "#5030E5"
                : column.title === "On Progress"
                ? "#FFA500"
                : column.title === "Done"
                ? "#8BC48A"
                : "#D1D5DB",
          }}
        />
      </div>
      {/* Toggle form */}
      {showForm && (
        <TaskForm
          columnTitle={column.title}
          onClose={() => setShowForm(false)}
        />
      )}
      {/* Task Cards */}
      <div className="space-y-4">
        {column.tasks?.map((task, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm relative transition duration-200 cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, column.title, i)}
          >
            {/* Three-dot menu */}
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={18} />
            </button>

            {/* Priority Badge */}
            <div
              className={`text-[10px] font-medium px-2 py-0.5 rounded-sm w-fit mb-3
                ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }
              `}
            >
              {task.priority}
            </div>

            {/* Title + Description */}
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {task.title}
            </h3>
            <p className="text-xs text-gray-500 mb-4">{task.description}</p>

            {/* Footer: Avatars + Metadata */}
            <div className="flex items-center justify-between">
              {/* Avatars */}
              <div className="flex -space-x-2">
                {task?.avatars?.map((src, j) => (
                  <img
                    key={j}
                    src={src}
                    alt={`Avatar ${j}`}
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>

              {/* Comments & Files */}
              <div className="flex items-center gap-4 text-[11px] text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare size={12} />
                  <span>{task.comments} comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText size={12} />
                  <span>{task.files} files</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
