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
import { Avatar, Box, Button, Card, CardContent, Container, Icon, Typography } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders, updateState } from "../../../../redux/actions";

export default function OrdersSlider({ orders }) {
  const dispatch = useDispatch()

  const [cardInfo, setCardInfo] = useState({
    name:"",
    lastname:"",
    direction:""
  })

  const onAcceptedClick = ({ direction, name, lastname, id }) => {
    dispatch(updateState(id))
    setCardInfo({
      name,
      lastname,
      direction
    })
      // setCardInfo({
      //   name:"",
      //   lastname:"",
      //   direction:""
      // })

  }


  

  return (
    <Container style={{display:"flex"}}>

      {cardInfo?.direction.length 
      ? 
        <Card style={{color:"#1976d2",backgroundColor:"whitesmoke", minWidth:"30vw", minHeight:"20vh", display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <CardContent style={{padding:"0px 45px"}}>
          <Typography variant="h3">{cardInfo.direction}</Typography>
            <Box style={{display:"flex", gap:"10px"}}>
              <Typography variant="h4">{cardInfo.name}</Typography>
              <Typography variant="h4">{cardInfo.lastname}</Typography>
            </Box>
            <Button variant="contained" style={{marginTop:"50px"}}>PEDIDO ENTREGADO</Button>
          </CardContent> 
        </Card>
      : <Typography variant="h3"> Aún no tienes ningún encargo asignado.</Typography>
    }

      
      

      
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
        style={{maxWidth:"30vw"}}
      >
        {/* {isAccepted !== true 
        ?  */}
          {orders?.map(order => {
            return ( order?.selection !== true ?
                  <SwiperSlide>
                      <Card sx={{display:"flex", flexDirection:"column", backgroundColor:"whitesmoke", minHeight:"250px", justifyContent:"center", color:"#1976d2", padding:"20px", borderRadius:"10px"}}>
                          <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                          <Box style={{display:"flex", justifyContent:"center", padding:"15px"}}><Avatar style={{backgroundColor:"#1976d2"}}><ShoppingBag/></Avatar></Box>
                          <Typography variant="h6" sx={{marginBottom:"10px"}}>{order?.order?.direction}</Typography>
                          <Button variant="contained" onClick={() => onAcceptedClick({direction:order?.order?.direction, name:order?.order?.name, lastname:order?.order?.lastname, id:order._id})}>Aceptar encargo</Button>
                      </Card>
                  </SwiperSlide>
                  : <></>
                )
          })
      //   :
      //   order.selection === true ? <Typography variant="h5">Completá el último encargo asignado.</Typography> : <></> }
      }
        
        
      {/* > Hago click en Aceptar Encargo 
      > la propiedad selection del order pasa a ser true (desde el back)
      > se muestran todos menos el order que seleccioné
      > */}

          
      </Swiper>
      
    </Container>
  );
}
