import React, { useEffect, useState } from "react";
import Navbar from "./homePage/Navbar";
import Body from "./homePage/MainSection";
import OfferSection from "./homePage/OfferSection";
import HDITsection from "./homePage/HDITsection";
import PopularItemSection from "./homePage/PopularItemSection";
import FeatureRestaurant from "./homePage/FeatureRestaurant";
import OrderSection from "./homePage/OrderSection";
import Footer from "./homePage/Footer";
import weatherCall from "../apicalls/LocationAPI";

const Home = () => {
  const [location, setLocation] = useState({
    longitude: null,
    latitude: null
  });
  const [data, setData] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({
        latitude: latitude,
        longitude: longitude
      });
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, [])

  useEffect(() => {
    // getWeather(location)
    handleConvert(location.latitude, location.longitude)
  }, [location])

  const handleConvert = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.da840e3b5c956ac39535ae16bf237b25&lat=${latitude}&lon=${longitude}&format=json`
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Error in the geocoding request.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar data={data} />
      <Body />
      <OfferSection />
      <HDITsection />
      <PopularItemSection />
      <FeatureRestaurant />
      <OrderSection />
      <Footer />
    </>
  );
};

export default Home;
