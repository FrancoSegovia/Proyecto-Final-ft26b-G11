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
import { deleteOrder, getAllOrders, updateState } from "../../../../redux/actions";
import jwtDecode from "jwt-decode";

export default function OrdersSlider() {

  const [haveOrder, setHaveOrder] = useState(false);
  const orders = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [orders]);

  const dispatch = useDispatch();
  // const status = jwtDecode(localStorage.getItem("token")).status

  const [cardInfo, setCardInfo] = useState({
    name:"",
    lastname:"",
    direction:"",
    idO:"",
    idU:""
  })

  const onAcceptedClick = ({ direction, name, lastname, idO, idU }) => {
    dispatch(updateState(idO))
    setCardInfo({
      name,
      lastname,
      direction,
      idO,
      idU
    })
    setHaveOrder(true);
      // setCardInfo({
      //   name:"",
      //   lastname:"",
      //   direction:""
      // })
  }


  const onCheckClick = (idO, idU) => {
    dispatch(deleteOrder(idO, idU));
    setHaveOrder(false)
    setCardInfo({
      name:"",
      lastname:"",
      direction:"",
      idO:"",
      idU:""
    })
  }


  

  return (
    <Container style={{display:"flex", overflow:"hidden", minHeight:"30vh"}}>

      {cardInfo?.direction.length 
      ? 
        <Card style={{ color:"#1976d2",backgroundColor:"whitesmoke", minWidth:"30vw", maxWidth:"30vw", minHeight:"30vh", display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <CardContent style={{padding:"0px 45px"}}>
          <Typography variant="h4" align="center">{cardInfo.direction}</Typography>
            <Box style={{display:"flex", gap:"10px", justifyContent:"center"}}>
              <Typography variant="h4">{cardInfo.name}</Typography>
              <Typography variant="h4">{cardInfo.lastname}</Typography>
            </Box>
            <Button variant="contained" style={{marginTop:"50px"}} onClick={() => onCheckClick(cardInfo.idO,cardInfo.idU)}>PEDIDO ENTREGADO</Button>
          </CardContent> 
        </Card>
      : <Box style={{display:"flex", alignItems:"center", color:"#1976d2"}}><Typography variant="h5" align="center"> Aún no tienes ningún <br/> encargo asignado.</Typography></Box>
    }

      
      

      { haveOrder !== true ? 

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
                          <Card sx={{display:"flex", flexDirection:"column", backgroundColor:"whitesmoke", minHeight:"250px", maxWidth:"300px", justifyContent:"center", color:"#1976d2", padding:"20px", borderRadius:"10px"}}>
                              <Typography variant="h5">¡Nuevo pedido disponible!</Typography>
                              <Box style={{display:"flex", justifyContent:"center", padding:"15px"}}><Avatar style={{backgroundColor:"#1976d2"}}><ShoppingBag/></Avatar></Box>
                              <Typography variant="h6" sx={{marginBottom:"10px"}}>{order?.order?.direction}</Typography>
                              <Button variant="contained" onClick={() => onAcceptedClick({direction:order?.order?.direction, name:order?.order?.name, lastname:order?.order?.lastname, idO:order._id, idU:order.order._id})}>Aceptar encargo</Button>
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
          :

          <Box style={{display:"flex", alignItems:"center", color:"#1976d2"}}><Typography variant="h5" align="center">Debes terminar el encargo actual.</Typography></Box>
      }
      
      
    </Container>
  );
}
