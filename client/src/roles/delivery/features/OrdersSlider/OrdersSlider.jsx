import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Avatar, Box, Button, Icon, Typography } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";

export default function OrdersSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        
      >
        <SwiperSlide>
            <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"whitesmoke", minHeight:"250px", justifyContent:"center", color:"#1976d2", padding:"20px", borderRadius:"10px"}}>
                <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                <Box style={{display:"flex", justifyContent:"center", padding:"15px"}}><Avatar style={{backgroundColor:"#1976d2"}}><ShoppingBag/></Avatar></Box>
                <Typography variant="h6" sx={{marginBottom:"10px"}}>Alberdi 1653</Typography>
                <Button variant="contained">Aceptar encargo</Button>
            </Box>
        </SwiperSlide>

        <SwiperSlide>
            <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"whitesmoke", minHeight:"250px", justifyContent:"center", color:"#1976d2", padding:"20px", borderRadius:"10px"}}>
                <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                <Box style={{display:"flex", justifyContent:"center", padding:"15px"}}><Avatar style={{backgroundColor:"#1976d2"}}><ShoppingBag/></Avatar></Box>
                <Typography variant="h6" sx={{marginBottom:"10px"}}>Alberdi 1653</Typography>
                <Button variant="contained">Aceptar encargo</Button>
            </Box>
        </SwiperSlide>

        <SwiperSlide>
            <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"whitesmoke", minHeight:"250px", justifyContent:"center", color:"#1976d2", padding:"20px", borderRadius:"10px"}}>
                <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                <Box style={{display:"flex", justifyContent:"center", padding:"15px"}}><Avatar style={{backgroundColor:"#1976d2"}}><ShoppingBag/></Avatar></Box>
                <Typography variant="h6" sx={{marginBottom:"10px"}}>Alberdi 1653</Typography>
                <Button variant="contained">Aceptar encargo</Button>
            </Box>
        </SwiperSlide>

        <SwiperSlide>
            <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"whitesmoke", minHeight:"250px", justifyContent:"center", color:"#1976d2", padding:"20px", borderRadius:"10px"}}>
                <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                <Box style={{display:"flex", justifyContent:"center", padding:"15px"}}><Avatar style={{backgroundColor:"#1976d2"}}><ShoppingBag/></Avatar></Box>
                <Typography variant="h6" sx={{marginBottom:"10px"}}>Alberdi 1653</Typography>
                <Button variant="contained">Aceptar encargo</Button>
            </Box>
        </SwiperSlide>

        {/* <SwiperSlide>
            <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"red", minHeight:"250px"}}>
                <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                <Typography variant="h6">Alberdi 1653</Typography>
                <Button variant="contained">Aceptar encargo</Button>
            </Box>
        </SwiperSlide> */}

        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
