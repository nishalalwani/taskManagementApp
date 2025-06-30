import React, { useEffect } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import homeIcon from "../assets/icons/category.svg";
import messageIcon from "../assets/icons/message.svg";
import taskIcon from "../assets/icons/task-square.svg";
import profileIcon from "../assets/icons/profile-2user.svg";
import settingIcon from "../assets/icons/setting-2.svg";
import icon from "../assets/icons/icon.svg";
import lampIcon from "../assets/icons/lamp-on.svg";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Call once to set correct initial state on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { icon: homeIcon, label: "Home" },
    { icon: messageIcon, label: "Messages" },
    { icon: taskIcon, label: "Tasks" },
    { icon: profileIcon, label: "Members" },
    { icon: settingIcon, label: "Settings" },
  ];

  const projects = [
    { name: "Mobile App", selected: true, color: "bg-green-500" },
    { name: "Website Redesign", color: "bg-orange-400" },
    { name: "Design System", color: "bg-purple-200" },
    { name: "Wireframes", color: "bg-blue-300" },
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        sidebarOpen ? "w-58" : "w-20"
      } border-r border-[#DBDBDB] py-6 bg-white fixed top-0 left-0 bottom-0 z-20 flex flex-col`}
    >
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute ${
          sidebarOpen ? "right-4 top-6 p-1" : "left-10 top-5 p-1"
        }`}
      >
        {sidebarOpen ? (
          <ChevronsLeft size={25} color="#b3b3b3" />
        ) : (
          <ChevronsRight size={25} color="#b3b3b3" />
        )}
      </button>

      {/* Logo */}
      <div className="border-b border-[#DBDBDB] mb-4 pb-2">
        <div
          className={`flex items-center gap-4 px-4 ${
            sidebarOpen ? "pb-4" : "pb-5"
          }`}
        >
          <img src={icon} alt="Logo" />
          <div className="text-xl font-bold">{sidebarOpen ? "Project M." : ""}</div>
        </div>
      </div>

      {/* Navigation & Projects container grows to push thoughts box down */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Navigation */}
        <nav className="space-y-4 pt-5">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 pl-1 pb-2 text-gray-500 hover:text-black cursor-pointer"
            >
              <img src={item.icon} alt={item.label} />
              {sidebarOpen && item.label}
            </div>
          ))}
        </nav>

        {sidebarOpen && (
          <>
            {/* My Projects Section */}
            <div className="mt-5">
              <div className="border-t border-[#DBDBDB] mt-5 mb-5"></div>

              <div className="flex justify-between items-center mb-5">
                <div className="text-xs uppercase text-gray-400">My Projects</div>
                <div className="p-[0.1rem] border border-gray-300 rounded-md cursor-pointer">
                  <Plus size={10} color="#787486" />
                </div>
              </div>

              <div className="space-y-2">
                {projects.map((project, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer ${
                      project.selected
                        ? "bg-[#5030E514] bg-opacity-50 text-dark-700 font-bold"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${project.color}`}></span>
                      <span>{project.name}</span>
                    </div>
                    {project.selected && (
                      <MoreHorizontal size={16} className="text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Thoughts Time Box - pinned to bottom */}
      {sidebarOpen && (
        <div className="relative mt-10 bg-[#e4e4e487] p-4 rounded-lg text-center mx-4">
          {/* Bulb Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#e4e4e487] flex items-center justify-center">
            <img
              src={lampIcon}
              alt=""
              className="w-6 h-6 rounded-full shadow-[0_0_20px_6px_rgba(250,204,21,0.4)]"
            />
          </div>

          <p className="text-sm mt-4 mb-2">Thoughts Time</p>
          <p className="text-xs text-gray-500">
            We don’t have any notice for you, then you can share your thoughts with your peers.
          </p>
          <button className="mt-3 bg-white text-dark-700 px-3 py-1 rounded-md text-xs">
            Write a message
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
