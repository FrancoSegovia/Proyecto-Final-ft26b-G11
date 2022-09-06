import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import LandingHeroLayout from "./LandingHeroLayout";
import Typography from "../Typography/Typography";

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
          ¡Tus platos preferidos a tan solo un <br />
          <span style={{ color: "#b3e5fc", fontWeight: "bolder" }}>Click!</span>
        </Typography>
        <Typography
          color="#1976d2"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
        >
          ¡Registrate ahora!
        </Typography>
        <Link to="/SignUp" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            component="a"
            sx={{ minWidth: 200, backgroundColor: "#1976d2" }}
            onClick={() => localStorage.setItem("type", "user")}
          >
            REGISTRARME
          </Button>
        </Link>
      </LandingHeroLayout>
    </>
  );
}
