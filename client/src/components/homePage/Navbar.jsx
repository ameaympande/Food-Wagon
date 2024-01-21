import { MapPin, UserIcon, AlignJustify } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../layout/Button";
import { useSelector } from "react-redux";

const Navbar = ({ data }) => {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  console.log(profile)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="bg-bg-primary">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-transparent">
            <img
              className="h-16 w-auto object-cover"
              src="logo.png"
              alt="Logo"
            />
          </div>

          <div className="ml-2 font-bungee text-xl">FoodWagon</div>
        </div>
        <div
          ref={sidebarRef}
          className="relative flex items-center ml-2 md:hidden"
        >
          <Button onClick={toggleSidebar} userIcon={AlignJustify} />

          {isSidebarOpen && (
            <div className="absolute top-10 right-0 flex flex-col items-center bg-white bg-opacity-90 p-4 gap-5 bg-bg-primary">
              <p
                onClick={() => {
                  navigate("/signin");
                }}
                className="cursor-pointer text-primary font-bold hover:text-secondary"
              >
                <div className="flex">
                  <UserIcon />
                  <span className="ml-2">Login</span>
                </div>
              </p>
              <p
                onClick={() => {
                  navigate("/another-link");
                }}
                className="cursor-pointer text-primary font-bold hover:text-secondary"
              >
                Another Link
              </p>
              {/* Add other sidebar text items here */}
            </div>
          )}
        </div>

        <div className="ml-14 flex-grow md:flex items-center gap-4 md:block hidden">
          <span className="text-black font-bold ">Deliver to:</span>
          <span className="ml-2">
            <MapPin size={18} color="#ffb512" />
          </span>
          <span className="ml-2 text-grey ">Current location</span>
          {!data ? (
            <span className="ml-2 text-black font-bold ">Your location</span>

          ) : (

            <span className="ml-2 text-black font-bold ">{data.address.village} , {data.address.state} , {data.address.state_district}</span>
          )}

          <div className="ml-4 flex-grow ">
            <input
              className="w-full bg-bg-primary px-2 py-1"
              type="text"
              placeholder="Search food"
            />
          </div>
        </div>
        <div className="md:block hidden mr-5">
          <Button
            onClick={() => {
              navigate("/signin");
            }}
            buttonText={profile?.email ? profile.email : "Login"}
            userIcon={UserIcon}
            color="#ffb512"
          />

        </div>
      </div>
    </div>
  );
};

export default Navbar;
