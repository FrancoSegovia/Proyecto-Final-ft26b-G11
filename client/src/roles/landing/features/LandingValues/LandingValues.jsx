import React from "react";
import { Link } from "react-router-dom";

import Typography from "../Typography/Typography";
import TopSvg from "../svg/TopSvg";
import BotSvg from "../svg/BotSvg";
import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import { AddBusiness, Person } from "@mui/icons-material";

const item = {
  display: "flex",
  flexDirection: "column",
  px: 5,
  backgroundColor: "#b3e5fc",
  minHeight: "250px",
  maxHeight: "250px",
  borderRadius: "25px",
  color: "#1976d2",
  gap: 5,
};

export default function LandingValues() {
  return (
    <>
      <TopSvg />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h5"
          sx={{
            my: 1,
            position: "absolute",
            color: "#b3e5fc",
            fontSize: "3vw",
          }}
        >
          ¡Trabajá con nosotros!
        </Typography>
      </Box>
      <Box
        component="section"
        sx={{
          display: "flex",
          overflow: "hidden",
          bgcolor: "#1976d2",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{ mt: 15, mb: 15, display: "flex", justifyContent: "center" }}
        >
          <Grid
            container
            style={{
              borderRadius: "25px",
              justifyContent: "center",
              marginLeft: "5px",
              marginRight: "5px",
              gap: "20px",
            }}
          >
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Typography variant="h5" style={{ marginTop: "70px" }}>
                  ¡Convertite en repartidor!
                </Typography>
                <Link to="/SignUp" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ justifySelf: "flex-end" }}
                    onClick={() => localStorage.setItem("type", "delivery")}
                  >
                    ¡Quiero ser Clicker!
                    <IconButton style={{ color: "white" }}>
                      <Person />
                    </IconButton>
                  </Button>
                </Link>
              </Box>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Typography variant="h6" sx={{ my: 5 }}>
                  New experiences
                </Typography>
                <Typography variant="h5" style={{padding:"0px 5px 50px 5px"}}>
                  {
                    "Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… "
                  }

                  {"your Sundays will not be alike."}
                </Typography>
              </Box>
            </Grid> */}
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Typography variant="h5" style={{ marginTop: "70px" }}>
                  ¡Administrá tu negocio!
                </Typography>
                <Link to="/SignUp" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ justifySelf: "flex-end" }}
                    onClick={() => localStorage.setItem("type", "owner")}
                  >
                    ¡Registrate como dueño!
                    <IconButton style={{ color: "white" }}>
                      <AddBusiness />
                    </IconButton>
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <BotSvg />
    </>
  );
}
