import React from "react";
import LandingAppBar from "../features/LandingAppBar/LandingAppBar";
import LandingHero from "../features/LandingHero/LandingHero";
import LandingValues from "../features/LandingValues/LandingValues"
// import ProductHowItWorks from './modules/views/ProductHowItWorks';
// import AppFooter from './modules/views/AppFooter';

export default function LandingPage() {
  return (
    <>
    <LandingAppBar />
    <LandingHero />
    <LandingValues />
      {/*

      <ProductValues />
    <ProductHowItWorks />
        <AppFooter /> 
      */}
    </>
  );
}
