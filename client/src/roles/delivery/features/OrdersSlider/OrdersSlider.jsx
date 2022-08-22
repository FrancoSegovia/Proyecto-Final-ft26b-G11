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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders } from "../../../../redux/actions";

export default function OrdersSlider({ orders }) {

  const [isAccepted, setIsAccepted] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    name:"",
    lastname:"",
    direction:""
  })

  const onAcceptedClick = ({ direction, name, lastname }) => {
    setIsAccepted(true);
    setCardInfo({
      name,
      lastname,
      direction
    })

    setTimeout(() => {
      setIsAccepted(false)
      setCardInfo({
        name:"",
        lastname:"",
        direction:""
      })
    }, 5000);
  }

  console.log(orders)
  

  return (
    <Box style={{display:"flex", justifyContent:"space-between", gap:"30px"}}>
      <Box style={{backgroundColor:"red"}}>
        <Box>
          <Typography variant="h4">{cardInfo.name}</Typography>
          <Typography variant="h4">{cardInfo.direction}</Typography>
        </Box>
        <Typography variant="h4">{cardInfo.lastname}</Typography>
      </Box>
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
        {orders?.map(order => {
          return ( !isAccepted ?
                <SwiperSlide>
                    <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"whitesmoke", minHeight:"250px", justifyContent:"center", color:"#1976d2", padding:"20px", borderRadius:"10px"}}>
                        <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                        <Box style={{display:"flex", justifyContent:"center", padding:"15px"}}><Avatar style={{backgroundColor:"#1976d2"}}><ShoppingBag/></Avatar></Box>
                        <Typography variant="h6" sx={{marginBottom:"10px"}}>{order?.order?.direction}</Typography>
                        <Button variant="contained" onClick={() => onAcceptedClick({direction:order?.order?.direction, name:order?.order?.name, lastname:order?.order?.lastname})}>Aceptar encargo</Button>
                    </Box>
                </SwiperSlide>
                : <></>
              )
        })}
        {isAccepted ? <Typography variant="h5">Completá el último encargo asignado.</Typography> : <></> }

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
      
    </Box>
  );
}
