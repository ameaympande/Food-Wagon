import { MapPin, Search, UserIcon, UserRound } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../layout/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const [islogin, setLoggedIn] = useState(false);
  return (
    <div className="bg-bg-primary">
      <div className="p-3 grid grid-rows-1 grid-flow-col gap-3">
        <div className="justify-center container flex flex-row items-center gap-4">
          <div className="bg-transparent">
            <img className="h-16 cover" src="logo.png" alt="Logo" />
          </div>
          <div className="mt-2 font-bungee text-xl">FoodWagon</div>
        </div>
        <div className="mt-2 bg-green container flex flex-row items-center">
          <span className="text-black font-bold">Deliver to :</span>
          <span className="ml-2">
            <MapPin size={18} color="#ffb512" />
          </span>
          <span className="ml-2 text-grey">Current location</span>
          <span className="ml-2 text-black font-bold">Your location</span>
        </div>
        <div className="mt-2 container flex flex-row items-center">
          <div>
            <Search size={18} color="#ffb512" absoluteStrokeWidth />
          </div>
          <div className="ml-4">
            <input
              className="bg-bg-primary px-2 py-1"
              type="text"
              placeholder="Search food"
            />
          </div>
          <div className="items-center">
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
    </div>
  );
};

export default Navbar;
