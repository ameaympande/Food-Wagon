import React from "react";
import WorkCard from "../layout/WorkCard";
import Button from "../layout/Button";
import { CookingPot, Salad } from "lucide-react";

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
const OrderSection = () => {
    return (
        <div className="bg-[url('https://technext.github.io/foodwagon/v1.0.0/assets/img/gallery/cta-two-bg.png')] bg-no-repeat bg-center bg-cover  min-h-[350px] flex flex-col items-center justify-center">
            <div className="text-text-primary text-4xl md:text-6xl font-extrabold text-center whitespace-pre-line">
                <p>Are you ready to order </p>
                <p>with the best deals? </p>
            </div>
            <Button
                onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                buttonText="PROCEED TO ORDER"
                userIcon={CookingPot}
                size={30}
                color="black"
                textColor="text-primary"
                style="mt-7 bg-secondary hover:text-secondary "
                textStyle="p-1 ml-3 px-2"
            />
        </div>
    );
};

export default OrderSection;
