import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteOrder,
  getAllOrders,
  getDeliveryOrders,
  updateState,
} from "../../../../redux/actions";
import jwtDecode from "jwt-decode";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

export default function OrdersSlider({ clearRoute }) {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);
  const deliveryOrders = useSelector((state) => state.deliveryOrders);

  const [click2, setClick2] = useState("");

  const onAcceptedClick = (idO) => {
    setClick2("accept");
    dispatch(updateState(idO));
  };

  const onCheckClick = (idO, idU) => {
    setClick2("check");
    dispatch(deleteOrder(idO, idU));
    clearRoute();
  };

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getDeliveryOrders(jwtDecode(localStorage.getItem("token"))._id));
  }, [click2]);

  return (
    <Box
      style={{
        display: "flex",
        minHeight: "30vh",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {Object.keys(deliveryOrders).length && deliveryOrders.order.length ? (
        <Card
          style={{
            color: "#1976d2",
            minWidth: "30vw",
            maxWidth: "32vw",
            minHeight: "35vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardContent style={{ padding: "0px 45px" }}>
            <Typography variant="h4" align="center">
              {deliveryOrders.order[0]?.order.direction}
            </Typography>
            <hr />
            <Box
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <Typography variant="h4">
                {deliveryOrders.order[0]?.order.name}
              </Typography>
              <Typography variant="h4">
                {deliveryOrders.order[0]?.order.lastname}
              </Typography>
            </Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                style={{ marginTop: "50px" }}
                onClick={() =>
                  onCheckClick(
                    deliveryOrders.order[0]._id,
                    deliveryOrders.order[0].order._id
                  )
                }
              >
                PEDIDO ENTREGADO
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box
          style={{ display: "flex", alignItems: "center", color: "#1976d2" }}
        >
          <Typography variant="h5" align="center">
            {" "}
            A??n no tienes ning??n <br /> encargo asignado.
          </Typography>
        </Box>
      )}

      {Object.keys(deliveryOrders).length && !deliveryOrders.order.length ? (
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
          style={{ maxWidth: "30vw", margin: 0 }}
        >
          {/* {isAccepted !== true 
            ?  */}
          {
            orders?.map((order) => {
              return order?.selection !== true ? (
                <SwiperSlide>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "whitesmoke",
                      minHeight: "250px",
                      maxWidth: "300px",
                      justifyContent: "center",
                      color: "#1976d2",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography variant="h5">
                      ??Nuevo pedido disponible!
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "15px",
                      }}
                    >
                      <Avatar style={{ backgroundColor: "#1976d2" }}>
                        <ShoppingBag />
                      </Avatar>
                    </Box>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {order?.order?.direction}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => onAcceptedClick(order._id)}
                    >
                      Aceptar encargo
                    </Button>
                  </Card>
                </SwiperSlide>
              ) : (
                <></>
              );
            })
            //   :
            //   order.selection === true ? <Typography variant="h5">Complet?? el ??ltimo encargo asignado.</Typography> : <></> }
          }

          {/* > Hago click en Aceptar Encargo 
            > la propiedad selection del order pasa a ser true (desde el back)
            > se muestran todos menos el order que seleccion??
            > */}
        </Swiper>
      ) : (
        <Box
          style={{ display: "flex", alignItems: "center", color: "#1976d2" }}
        >
          <Typography variant="h5" align="center">
            Debes terminar el encargo actual.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
