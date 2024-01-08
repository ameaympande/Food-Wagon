import React from "react";
import Button from "../layout/Button";
import { Bike, ShoppingBag, MapPin, Search } from "lucide-react";

const MainSection = () => {
  return (
    <div className="flex flex-row bg-primary h-screen ">
      <div className="py-20 px-14 flex flex-col">
        <div className="text-text-primary text-6xl font-extrabold">
          Are you starving?
        </div>
        <div>within a few clicks, find meals that are accessible near you</div>
        <div className="flex flex-col mt-5 p-4 bg-text-primary rounded-xl w-full">
          {" "}
          <div className="flex flex-row p-2 gap-4">
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
          <div>
            <div className="mt-2 container relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <MapPin size={18} color="#fa6a41" absoluteStrokeWidth />
              </div>
              <input
                className="bg-bg-primary px-20 py-2 pl-10 w-3/9"
                type="text"
                placeholder="Enter your address"
              />
              <div className="ml-20 p-3">
                <Button
                  onClick={() => {
                    // navigate("/signin");
                  }}
                  buttonText="Find Food"
                  userIcon={Search}
                  color="#ffb512"
                  textColor="text-primary"
                  style="p-10 bg-secondary hover:text-secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow relative overflow-hidden">
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
