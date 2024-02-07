import React from "react";
import Button from "./Button";
import Title from "./Title";

const DiscountCard = ({
  backgroundImage,
  discountPercentage,
  restaurantName,
  offerDaysLeft,
}) => {
  return (
    <div>
      <div className="relative w-64 h-60 overflow-hidden rounded-xl transform transition-transform duration-300 hover:scale-110 1xl:flex-col ml-5">
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute bottom-0 left-0 p-4 h-22 w-28 bg-primary rounded-tr-xl justify-center">
            <div className="flex ">
              <div className="text-text-primary text-5xl font-extrabold">
                {discountPercentage}
              </div>
              <div className="flex flex-col ml-2">
                <div className="text-text-primary font-bold">%</div>
                <div className="text-text-primary">OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-2xl font-semibold">{restaurantName}</p>
      </div>

      <div className="flex mt-2">
        <Title
          text={`${offerDaysLeft} days remaining`}
          color="blue"
          size={30}
          textColor="ffb512"
        />
      </div>
    </div>
  );
};

export default DiscountCard;
