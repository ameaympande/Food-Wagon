import React, { useState } from "react";
import Button from "../layout/Button";
import { Bike, ShoppingBag, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainSection = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("Delivery");
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row relative z-10">
        <div className="md:w-2/3 py-5 px-6 md:py-10 md:px-14 flex flex-col relative z-10 flex-1">
          <div className="text-text-primary text-4xl md:text-6xl font-extrabold">
            Are you starving?
          </div>
          <p className="text-lg text-text-primary">
            Within a few clicks, find meals that are accessible near you.
          </p>
          <div className="flex flex-col mt-5 p-2 sm:p-4 bg-text-primary rounded-xl w-full md:w-4/5 mx-auto relative z-10">
            <div className="flex flex-row gap-2">
              <div>
                <Button
                  onClick={() => setOrderType("Delivery")}
                  buttonText="Delivery"
                  userIcon={Bike}
                  color="black"
                  size={24}
                  bgColor={orderType === "Delivery" && "bg-secondary"}
                />
              </div>
              <div>
                <Button
                  onClick={() => setOrderType("Pickup")}
                  buttonText="Pickup"
                  userIcon={ShoppingBag}
                  color="black"
                  size={24}
                  bgColor={orderType === "Pickup" && "bg-secondary"}
                />
              </div>
            </div>
            <hr className="mt-4 text-slate-300" />
            <div className="mt-2 relative flex flex-col md:flex-row items-center">
              <div className="md:absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <MapPin size={18} color="#fa6a41" absoluteStrokeWidth />
              </div>
              <div className="ml-15 w-2/3 border rounded-xl border-[#fa6a41] border-2">
                <input
                  className="ml-2 bg-bg-primary px-6 py-2 md:w-3/5 w-full md:pl-10 md:ml-6 mt-2 border-transparent"
                  type="text"
                  placeholder="Enter your address"
                  style={{ outline: 'none' }}
                />
              </div>

              <div className="md:ml-6 mt-4 md:mt-0">
                <Button
                  onClick={() => {
                    navigate("/signin");
                  }}
                  buttonText="Find Food"
                  userIcon={Search}
                  color="#ffb512"
                  textColor="text-primary"
                  style="p-4  bg-secondary hover:text-secondary"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center pointer-events-none z-0">
          <img
            className="absolute top-20 hover:top-0 transition-all ease-out delay-5000 max-w-full h-auto"
            src="/bowl.png"
            alt="Bowl"
          />
        </div>

      </div>
    </div>
  );
};

export default MainSection;
