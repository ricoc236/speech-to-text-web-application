import { Home, Settings } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const Sidebar  = () => {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-40
        ${isOpen ? "w-150" : "w-0"}
        bg-[#85D1DB] text-gray-100 border-r shadow-sm transition-all duration-300 flex flex-col`}
    >
      <div className="flex-1 p-2 mt-12"> 
        <ul className="space-y-2">
          <li className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 cursor-pointer">
            <Home size={20} />
            {isOpen && <span>Home</span>}
          </li>
          <li className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 cursor-pointer">
            <Settings size={20} />
            {isOpen && <span>Settings</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
