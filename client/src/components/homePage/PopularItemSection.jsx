import { UserRound } from "lucide-react";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapPin } from "lucide-react";
import Button from "../layout/Button";

const data = [
  {
    itemImg:
      "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
    itemName: "Classic Cheeseburger",
    location: "Pimple Saudagar",
    price: "120",
  },
  {
    itemImg:
      "https://hot-thai-kitchen.com/wp-content/uploads/2015/09/Toffee-cake-sm.jpg",
    itemName: "Toffe's cake",
    location: "Aundh",
    price: "150",
  },
  {
    itemImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISDBoabcQjOUP7vSPTsh-4sCQeRBI-xcf8w",
    itemName: "Dancake",
    location: "Pimple Gurav",
    price: "130",
  },
  {
    itemImg:
      "https://www.foodandwine.com/thmb/FruFDfmVzUgb6elux4DPifdmDb8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/super-crispy-fried-chicken-sandwiches-2-FT-RECIPE0820-33643e5fe9d44932bdd0bb0d104d9a4b.jpg",
    itemName: "Crispy sandwich",
    location: "Deccan",
    price: "110",
  },
  {
    itemImg:
      "https://www.allrecipes.com/thmb/G96Vc_7F5Dm0csJJb2STC6tO97k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-mfs-49-79b33da67e2643e8b585972cd92c5821.jpg",
    itemName: "Fried Rice",
    location: "Deccan",
    price: "110",
  },
  {
    itemImg:
      "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
    itemName: "Classic Cheeseburger",
    location: "Pimple Saudagar",
    price: "120",
  },
  {
    itemImg:
      "https://hot-thai-kitchen.com/wp-content/uploads/2015/09/Toffee-cake-sm.jpg",
    itemName: "Toffe's cake",
    location: "Aundh",
    price: "150",
  },
  {
    itemImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISDBoabcQjOUP7vSPTsh-4sCQeRBI-xcf8w",
    itemName: "Dancake",
    location: "Pimple Gurav",
    price: "130",
  },
  {
    itemImg:
      "https://www.foodandwine.com/thmb/FruFDfmVzUgb6elux4DPifdmDb8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/super-crispy-fried-chicken-sandwiches-2-FT-RECIPE0820-33643e5fe9d44932bdd0bb0d104d9a4b.jpg",
    itemName: "Crispy sandwich",
    location: "Deccan",
    price: "110",
  },
  {
    itemImg:
      "https://www.allrecipes.com/thmb/G96Vc_7F5Dm0csJJb2STC6tO97k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-mfs-49-79b33da67e2643e8b585972cd92c5821.jpg",
    itemName: "Fried Rice",
    location: "Deccan",
    price: "110",
  },
];

const PopularItemSection = () => {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };
  return (
    <div className="bg-bg-hover-primary min-h-96 px-4 py-6">
      <div className="text-4xl md:text-6xl font-extrabold text-center">
        <p className="mb-4 mt-10">Popular items</p>
      </div>
      <Slider {...settings}>
        {data.map((item, key) => (
          <div key={key} className="mx-2">
            <div>
              <img
                src={item.itemImg}
                alt={item.itemName}
                className="w-48 h-48 rounded-2xl"
              />
            </div>
            <div className="mt-5">
              <div className="mt-3 text-wrap">
                <h2 className="text-xl font-extrabold">{item.itemName}</h2>
              </div>
              <div className="flex">
                <MapPin size={18} color="#fa6a41" absoluteStrokeWidth />
                <p className="ml-1 text-secondary">{item.location}</p>
              </div>
              <p className="ml-1 text-lg font-extrabold"> ₹ {item.price}</p>
            </div>
            <div className="mt-3">
              <Button
                buttonText="Order now"
                color="#ffb512"
                textColor="text-primary"
                style="p-2 bg-secondary hover:text-secondary"
                textStyle="ml-0"
              />
            </div>
          </div>
        ))}
      </Slider>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={handlePrev}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={handleNext}
      >
        {">"}
      </button>
    </div>
  );
};

export default PopularItemSection;
