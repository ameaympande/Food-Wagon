import { MapPin, UserIcon, AlignJustify } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../layout/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogin, setLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-bg-primary">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-transparent">
            <img className="h-16 cover" src="logo.png" alt="Logo" />
          </div>
          <div className="ml-2 font-bungee text-xl">FoodWagon</div>
        </div>

        <div className="flex items-center ml-2 md:hidden">
          <Button onClick={toggleSidebar} userIcon={AlignJustify} />
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 bg-white bg-opacity-90 z-50">
            <div className="p-4">
              <Button
                onClick={() => {
                  navigate("/signin");
                }}
                buttonText="Login"
                userIcon={UserIcon}
                color="#ffb512"
              />
            </div>
          </div>
        )}

        <div className="ml-14 flex-grow md:flex items-center gap-4 md:block hidden">
          <span className="text-black font-bold ">Deliver to:</span>
          <span className="ml-2">
            <MapPin size={18} color="#ffb512" />
          </span>
          <span className="ml-2 text-grey ">Current location</span>
          <span className="ml-2 text-black font-bold ">Your location</span>

          <div className="ml-4 flex-grow ">
            <input
              className="w-full bg-bg-primary px-2 py-1"
              type="text"
              placeholder="Search food"
            />
          </div>
        </div>

        <div className="md:block hidden">
          <Button
            onClick={() => {
              navigate("/signin");
            }}
            buttonText="Login"
            userIcon={UserIcon}
            color="#ffb512"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
