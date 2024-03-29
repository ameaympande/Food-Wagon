import React, { useEffect, useState } from "react";
import DiscountCard from "../layout/DiscountCard";

const offerData = [
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-1.png",
    name: "Product Name 1",
    discountPercentage: 25,
    offerDaysLeft: 5,
  },
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-2.png",
    name: "Product Name 2",
    discountPercentage: 30,
    offerDaysLeft: 3,
  },
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-3.png",
    name: "Product Name 3",
    discountPercentage: 20,
    offerDaysLeft: 7,
  },
  {
    backgroundImage:
      "https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/discount-item-4.png",
    name: "Product Name 4",
    discountPercentage: 15,
    offerDaysLeft: 10,
  },
];



const OfferSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!data?.length) {
      reqOfferData();
    }
  }, [])

  const reqOfferData = async () => {
    try {
      const response = await fetch("https://food-wagon-server.onrender.com/restaurant/");
      const responseData = await response.json();
      setData(responseData?.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mt-20 gap-5 md:flex-row md:flex-wrap">
        {offerData.map((offer, index) => (
          <DiscountCard
            key={index}
            backgroundImage={offer.backgroundImage}
            name={offer.name}
            discountPercentage={offer.discountPercentage}
            offerDaysLeft={offer.offerDaysLeft}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
