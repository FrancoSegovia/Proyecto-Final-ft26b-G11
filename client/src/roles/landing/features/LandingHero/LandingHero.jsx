import React from "react";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import LandingHeroLayout from "./LandingHeroLayout";

export default function LandingHero() {
  return (
    <>
      <LandingHeroLayout
        sxBackground={{
          // backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "white", // Average color of the background image.
          backgroundPosition: "center",
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: "none" }}
          // src={backgroundImage}
          alt="increase priority"
        />
        <Typography color="#1976d2" align="center" variant="h2" marked="center">
          ¡Disfrutá de tus platos preferidos!
        </Typography>
        <Typography
          color="#1976d2"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
        >
          Enjoy secret offers up to -70% off the best luxury hotels every
          Sunday.
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/premium-themes/onepirate/sign-up/"
          sx={{ minWidth: 200 }}
        >
          Register
        </Button>
        <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
          Discover the experience
        </Typography>
      </LandingHeroLayout>
    </>
  );
}
