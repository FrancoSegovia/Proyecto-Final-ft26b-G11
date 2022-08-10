import React from "react";
import LandingAppBar from "../features/LandingAppBar/LandingAppBar";
import LandingHero from "../features/LandingHero/LandingHero";
import LandingValues from "../features/LandingValues/LandingValues";
import AppHowItWorks from "../features/AppHowItWorks/AppHowItWorks";
import AppFooter from "../features/AppFooter/AppFooter";
import LandingNavbar from "../features/LandingAppBar/LandingNavbar"

export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <LandingValues />
      <AppHowItWorks />
      <AppFooter />
    </>
  );
}