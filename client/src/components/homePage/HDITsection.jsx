import React from "react";
import WorkCard from "../layout/WorkCard";

const offerData = [
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/location.png",
    title: "Select location",
    content: "Choose the location <br/> where your food will be delivered.",
  },
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/order.png",
    title: "Choose order",
    content: "Check over hundreds of <br /> menus to pick your favorite food",
  },
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/pay.png",
    title: "Payment",
    content:
      "It's quick, safe, and simple.<br /> Select several methods of payment",
  },
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/meals.png",
    title: "Enjoy meals",
    content: "Food is made and <br /> delivered directly to your home.",
  },
];
const HDITsection = () => {
  return (
    <div className="mt-10 bg-bg-hover-primary min-h-96 px-4 py-6">
      <div className="text-text-orange text-4xl md:text-6xl font-extrabold text-center">
        <p className="mb-4 mt-10">How does it work</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col mt-14  md:flex-row md:flex-wrap">
          {offerData.map((offer, index) => (
            <WorkCard
              key={index}
              backgroundImage={offer.backgroundImage}
              title={offer.title}
              content={offer.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HDITsection;
