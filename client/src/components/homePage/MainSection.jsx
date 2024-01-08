import React from "react";
import Button from "../layout/Button";
import { Bike, ShoppingBag, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row bg-primary">
      <div className="md:w-2/3 py-10 px-6 md:py-20 md:px-14 flex flex-col">
        <div className="text-text-primary text-4xl md:text-6xl font-extrabold">
          Are you starving?
        </div>
        <div>Within a few clicks, find meals that are accessible near you.</div>
        <div className="flex flex-col mt-5 p-2 sm:p-4 bg-text-primary rounded-xl w-full md:w-4/5 mx-auto">
          <div className="flex flex-row  gap-2">
            <div>
              <Button
                onClick={() => console.log("clicked")}
                buttonText="Delivery"
                userIcon={Bike}
                color="#f07229"
                size={24}
              />
            </div>
            <div>
              <Button
                onClick={() => console.log("clicked")}
                buttonText="Pickup"
                userIcon={ShoppingBag}
                color="#f07229"
                size={24}
              />
            </div>
          </div>
          <hr className="mt-4 text-slate-300" />
          <div className="mt-2 relative flex flex-col md:flex-row items-center">
            <div className="md:absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none ">
              <MapPin size={18} color="#fa6a41" absoluteStrokeWidth />
            </div>
            <div className="ml-5 w-2/3">
              <input
                className="ml-2 bg-bg-primary px-6 py-2 md:w-3/5 w-full md:pl-10 md:ml-6 mt-2 "
                type="text"
                placeholder="Enter your address"
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
      <div className="md:w-1/3 relative hidden 1xl:block lg:overflow-hidden">
        <img
          className="absolute top-20 hover:top-0 transition-all ease-out delay-5000 h-full"
          src="/bowl.png"
          alt="Bowl"
        />
      </div>
    </div>
  );
};

export default MainSection;
