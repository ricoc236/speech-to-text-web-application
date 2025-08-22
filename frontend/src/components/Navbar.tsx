import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';

import { Menu, X } from "lucide-react";
import { useSidebar } from "./SidebarContext";
const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const { isOpen, toggleSidebar } = useSidebar(); 
      
        useEffect(() => {
          fetch(`${import.meta.env.VITE_API_URL}/auth/getUser`, { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(data => {
              if (data && data.username) {
                setUsername(data.username);
              }
              console.log("User data fetched:", username);
            })
        }, []);

return (
  
    <div className="fixed top-0 left-0 w-full z-50 shadow-xl bg-[#B3EBf2]"
    style={{height: `52px`}}>

        <div className = "container mx-auto flex justify-between items-center h-full px-4 focus:outline-none focus:ring-0">
            <div className="flex items-center gap-4 md:gap-6">
                {username && (
                  <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-0">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                ) }

                  
                <div className="">
                    <Link to="/" className="text-xl flex items-center text-primary-700 font-bol">
                        TEXT<span className="text-[#85D1DB] text-xl font-bold">IFY</span>
                    </Link>
                    
                </div>

            </div>
        <div className="flex items-center gap-4">
          {username ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-semibold">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {username}
              </span>
            </div>
          ) : (
            <>
              <button
                className="text-[#1a1a1a] border border-[#050706] text-sm font-semibold hover:text-[#C9FDF2] bg-transparent rounded-full px-4 py-1"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="shadow-2xl text-[#C9FDF2] text-sm font-semibold hover:text-[#C9FDF2] rounded-full bg-black px-4 py-1"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>


    </div>
) 
}
export default Navbar