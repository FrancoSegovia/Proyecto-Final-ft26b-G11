import React from "react";
import LandingAppBar from "../../features/LandingAppBar/LandingNavbar";
import LandingHero from "../../features/LandingHero/LandingHero";
import LandingValues from "../../features/LandingValues/LandingValues";
import LandingHowItWorks from "../../features/LandingHowItWorks/LandingHowItWorks";
import AppFooter from "../../features/AppFooter/AppFooter";

export default function LandingPage() {
  return (
    <>
      <LandingAppBar />
      <LandingHero />
      <LandingValues />
      <LandingHowItWorks />
      <AppFooter />
    </>
  );
}
