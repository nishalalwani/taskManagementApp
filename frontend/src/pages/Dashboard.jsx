import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskBoard from "../components/TaskBoard";
import { columns } from "../data/columnsData";

const Dashboard = () => {
  // State to control sidebar visibility based on screen width
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 800);

  // State to store the logged-in user's email
  const [userEmail, setUserEmail] = useState("");

  // On component mount, fetch the user's email from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "");
  }, []);

  return (
    // Main wrapper with flex layout and full screen height
    <div className="flex h-screen text-sm font-medium text-gray-700 overflow-hidden">
      {/* Sidebar component with toggleable visibility */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div
        className="flex flex-col flex-1 h-screen"
        style={{ marginLeft: sidebarOpen ? "14rem" : "5rem" }} // Adjust content position based on sidebar state
      >
        {/* Topbar receives the sidebar state and user email */}
        <Topbar sidebarOpen={sidebarOpen} userEmail={userEmail} />

        {/* Task board for displaying columns of tasks */}
        <TaskBoard initialColumns={columns} />
      </div>
    </div>
  );
};

export default Dashboard;
