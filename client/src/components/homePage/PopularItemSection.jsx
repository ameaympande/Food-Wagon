import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapPin } from "lucide-react";
import Button from "../layout/Button";
import { useNavigate } from "react-router-dom";
import OrderPopUp from "../layout/OrderPopUp";
import { GetMenuAPI } from "../../apicalls/GetMenuAPI";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
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
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const PopularItemSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || undefined;
  const [data, setData] = useState([]);

  useEffect(() => {
    getRestaurantData();
  }, []);

  async function getRestaurantData() {
    try {
      const response = await GetMenuAPI();
      if (response) {
        setData(response);
      } else {
        console.error("Invalid response from API:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleOrderClick = (item) => {
    if (!token) {
      navigate("/signin");
    } else {
      setSelectedItemName(item);
      setShowModal(!showModal);
    }
  };

  return (
    <div className="bg-bg-hover-primary px-4 py-6 ">
      <div className="text-4xl md:text-6xl font-extrabold text-center">
        <p className="mb-10 mt-10">Popular items</p>
      </div>
      <Slider {...settings} className="p-4">
        {data.map((item, key) => (
          <div key={key} className="px-2">
            <div className="flex flex-col items-center justify-center mt-4">
              <img
                src={item.backgroundImage}
                alt={item.itemName}
                className="w-56 h-56 rounded-2xl mb-4"
              />
              <div className="text-center">
                <h2 className="text-xl font-extrabold">{item.name}</h2>
                <div className="flex items-center justify-center">
                  <MapPin size={18} color="#fa6a41" absoluteStrokeWidth />
                  {/* <p className="ml-1 text-secondary">{item.address.city}, {item.address.street}</p> */}
                </div>
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => handleOrderClick(item)}
                  buttonText="Order now"
                  color="#ffb512"
                  textColor="text-primary"
                  style="p-2 bg-secondary hover:text-secondary"
                  textStyle="ml-0"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <OrderPopUp showModal={showModal} setShowModal={setShowModal} item={selectedItemName} />
    </div>
  );
};

export default PopularItemSection;
