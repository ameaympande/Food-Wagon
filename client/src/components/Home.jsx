import React from "react";
import Navbar from "./homePage/Navbar";
import Body from "./homePage/MainSection";
import OfferSection from "./homePage/OfferSection";
import HDITsection from "./homePage/HDITsection";

const Home = () => {
  return (
    <>
      <Navbar />

      <Body />
      <OfferSection />
      <HDITsection />
    </>
  );
};

export default Home;
