import React from "react";

import { Box, Grid, Icon } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "../Button/Button.jsx";
import Typography from "../Typography/Typography.jsx";
import { Link } from "react-router-dom";
import { ShoppingCart, AddCard as AddCardIcon, AccessTime as AccessTimeIcon} from "@mui/icons-material";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 30,
  fontFamily: "default",
  color: "#1976d2",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

export default function LandingHowItWorks() {

  return (
    <>
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "white", overflow: "hidden" }}
    >
      
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14, color:"#1976d2" }}>
          ¿Cómo funciona?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <ShoppingCart sx={{fontSize:"100px", translate:"0px -30px", color:"#1976d2"}}/>
                <Box sx={number}>1.</Box>
                <Typography variant="h5" align="center" sx={{color:"#1976d2"}}>
                  Ingrese a la página y agregue productos a su carrito.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <AddCardIcon  sx={{fontSize:"100px", translate:"0px -30px", color:"#1976d2"}}/>
                <Box sx={number}>2.</Box>
                <Typography variant="h5" align="center" sx={{color:"#1976d2"}}>
                  Ingrese un método de pago y siga los pasos para completar sus credenciales.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <DirectionsBikeIcon sx={{fontSize:"100px", translate:"0px -30px", color:"#1976d2"}}/>
                <Box sx={number}>3.</Box>
                <Typography variant="h5" align="center" sx={{color:"#1976d2"}}>
                  ¡Listo! Un Clicker estará llevando el pedido hasta su casa.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Link to="/signup" style={{textDecoration:"none"}}>
          <Button
            size="large"
            variant="contained"
            component="a"
            sx={{ mt: 8 }}
          >
            INGRESA AHORA
          </Button>
        </Link>
      </Container>
    </Box>
    </>
  );
}
