import React from "react";
import Navbar from "./homePage/Navbar";
import Body from "./homePage/MainSection";
import OfferSection from "./homePage/OfferSection";
import HDITsection from "./homePage/HDITsection";
import PopularItemSection from "./homePage/PopularItemSection";
import FeatureRestaurant from "./homePage/FeatureRestaurant";
import OrderSection from "./homePage/OrderSection";
import Footer from "./homePage/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
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
