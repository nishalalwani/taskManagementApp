import React from "react";
import {
  Search,
  Calendar,
  Bell,
  MessageSquareWarning,
  ChevronDown,
} from "lucide-react";
import profile from '../assets/images/user5.png';

const Topbar = ({ sidebarOpen,userEmail }) => {
  const left = sidebarOpen ? "14rem" : "5rem";

  return (
    <div
      className="flex flex-wrap md:flex-nowrap justify-between items-center px-15 py-4 bg-white border-b border-[#DBDBDB] fixed top-0 right-0 z-10 pt-5 pb-5 transition-all"
      style={{
        left: left,
        width: `calc(100% - ${left})`,
      }}
    >
      {/* Search Bar */}
      <div className="relative w-full md:w-1/2 mb-3 md:mb-0">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={19} />
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full pl-10 pr-10 py-2 rounded-md text-sm bg-[#F5F5F5]"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6">
        <Calendar size={20} className="text-gray-500" />
        <MessageSquareWarning size={20} className="text-gray-500" />

        {/* Bell Icon */}
        <div className="relative">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-[1px] right-[3px] block w-[4px] h-[4px] rounded-full bg-red-400 ring-1 ring-white" />
        </div>

        {/* Profile Info - Hidden on small screens */}
        <div className="text-right pl-2 hidden lg:block">
          <div className="text-sm font-semibold">{userEmail?userEmail:"Palak Jain"}</div>
          <div className="text-xs text-gray-500">Rajasthan, India</div>
        </div>

        {/* Avatar and Dropdown */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
