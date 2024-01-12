import { Star, Tag, Timer, UserRound } from "lucide-react";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapPin } from "lucide-react";

const data = [
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
    restaurantImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/150px-Burger_King_2020.svg.png",
    restaurantName: "Classic Cheeseburger",
    rating: "40",
    status: "Opens Tomorrow",
  },
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://hot-thai-kitchen.com/wp-content/uploads/2015/09/Toffee-cake-sm.jpg",
    restaurantImg:
      "https://interbrand.com/wp-content/uploads/2023/05/Britannia_images_Hero_600x400.jpg",
    restaurantName: "Toffe's cake",
    rating: "40",
    status: "Opens Tomorrow",
  },
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISDBoabcQjOUP7vSPTsh-4sCQeRBI-xcf8w",
    restaurantImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Amul_official_logo.svg/1200px-Amul_official_logo.svg.png",
    restaurantName: "Dancake",
    rating: "40",
    status: "Opens Tomorrow",
  },
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://www.foodandwine.com/thmb/FruFDfmVzUgb6elux4DPifdmDb8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/super-crispy-fried-chicken-sandwiches-2-FT-RECIPE0820-33643e5fe9d44932bdd0bb0d104d9a4b.jpg",
    restaurantImg:
      "https://images.crowdspring.com/blog/wp-content/uploads/2023/12/09194155/mcdonalds-logo.png",
    restaurantName: "Crispy sandwich",
    rating: "40",
    status: "Opens Tomorrow",
  },
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://www.allrecipes.com/thmb/G96Vc_7F5Dm0csJJb2STC6tO97k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-mfs-49-79b33da67e2643e8b585972cd92c5821.jpg",
    restaurantImg:
      "https://i.pinimg.com/736x/c9/32/9e/c9329ea6c6c2cf5610b34dbef34ac30a.jpg",
    restaurantName: "Fried Rice",
    rating: "40",
    status: "Opens Tomorrow",
  },
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
    restaurantImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/150px-Burger_King_2020.svg.png",
    restaurantName: "Classic Cheeseburger",
    rating: "40",
    status: "Opens Tomorrow",
  },
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://www.foodandwine.com/thmb/FruFDfmVzUgb6elux4DPifdmDb8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/super-crispy-fried-chicken-sandwiches-2-FT-RECIPE0820-33643e5fe9d44932bdd0bb0d104d9a4b.jpg",
    restaurantImg:
      "https://images.crowdspring.com/blog/wp-content/uploads/2023/12/09194155/mcdonalds-logo.png",
    restaurantName: "Crispy sandwich",
    rating: "40",
    status: "Opens Tomorrow",
  },
  {
    discount: "20%",
    deliveryTime: "Fast",
    itemImg:
      "https://www.allrecipes.com/thmb/G96Vc_7F5Dm0csJJb2STC6tO97k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-mfs-49-79b33da67e2643e8b585972cd92c5821.jpg",
    restaurantImg:
      "https://i.pinimg.com/736x/c9/32/9e/c9329ea6c6c2cf5610b34dbef34ac30a.jpg",
    restaurantName: "Fried Rice",
    rating: "40",
    status: "Opens Tomorrow",
  },
];

const FeatureRestaurant = () => {
  return (
    <div className="bg-bg-hover-primary px-4 py-6 ">
      <div className="text-2xl md:text-4xl font-extrabold text-center">
        <p className="mb-10 mt-10">Featured Restaurants</p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item, key) => (
          <div key={key} className="mx-2 relative">
            <div className="relative">
              <img
                src={item.itemImg}
                alt={item.restaurantName}
                className="w-100 h-52 rounded-2xl"
              />
              <div className="absolute top-2 left-3 p-1 bg-primary rounded justify-center">
                <div className="flex ">
                  <Tag className="p-1" color="white" />
                  <div className="text-text-primary text-xl font-extrabold">
                    {item.discount}
                  </div>
                  <div className="ml-2 text-text-primary text-xl font-extrabold">
                    OFF
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-3 md:right-10 p-1 bg-secondary rounded justify-center">
                <div className="flex">
                  <Timer className="p-1" color="white" />
                  <div className="text-text-primary text-xl font-extrabold">
                    {item.deliveryTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex">
              <div>
                <img
                  src={item.restaurantImg}
                  alt={item.restaurantName}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
              </div>
              <div className="p-2 flex flex-col">
                <h2 className="text-lg font-extrabold">
                  {item.restaurantName}
                </h2>
                <div className="p-2 flex">
                  <Star size={22} color="#ffcc00" />
                  <p className="ml-3 text-sm font-bold">{item.rating}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureRestaurant;
