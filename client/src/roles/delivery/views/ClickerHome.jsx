/*global google*/
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllShops } from "../../../redux/actions/index.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  IconButton,
  FormLabel,
} from "@mui/material";

import UserCard from "../../user/features/UserCard/UserCard.jsx";

import OrdersSlider from "../../delivery/features/OrdersSlider/OrdersSlider.jsx";
import Navbar from "../../delivery/features/ClickerNavbar/ClickerNavbar";

import { Grid } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import jwtDecode from "jwt-decode";

export default function Home() {

  const center = { lat: -38.717621879595484, lng: -62.265517288258536 };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBkqwYBKKegQLjYtO3ALhbwqsUjhEK3pUI",
    libraries: ["places"],
  });
  const dispatch = useDispatch();
  const deliveryInfo = jwtDecode(localStorage.getItem("token"))
  const orders = useSelector(state => state.orders);
  
  const [map, setMap] = useState(/**@type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const origen = { lat: -38.700129306504365, lng: -62.24152452874228 };

  //? const destino = (direccion del cliente)

  useEffect(() => {
    dispatch(getAllShops());
  }, []);


  useEffect(() => {
    dispatch(getAllOrders());
  }, [orders]);

  // eslint-disable-next-line no-undef
  if (!isLoaded) return <Typography>Cargando...</Typography>;

  //!switch modo de transporte
  // switch (delivery.vehicle.toUpperCase()) {
  //   case AUTO:
  //             deliveryTravelMode = google.maps.TravelMode.DRIVING;
  //     break;
  //   case MOTO:
  //             deliveryTravelMode = google.maps.TravelMode.TWO_WHEELER;
  //     break;
  //   case BICICLETA:
  //             deliveryTravelMode = google.maps.TravelMode.BICYCLING;
  //   default:
  //             deliveryTravelMode = google.maps.TravelMode.DRIVING;
  //     break;
  // }

  const deliveryTravelMode = google.maps.TravelMode.DRIVING;

  const calculateRoute = async () => {

      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: origen,
        destination:"Tucumán 2454, Bahía Blanca, Provincia de Buenos Aires, Argentina", //const destino
        // eslint-disable-next-line no-undef
        travelMode: deliveryTravelMode,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text); 

  };


  return (
    <div style={{overflow:"hidden"}}>
      <Navbar />
      <Box
        style={{
          marginTop: "75px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          padding: "3vh",
          minHeight:"85vh",
          paddingTop:"50px",
          overflow:"hidden"
        }}
      >
        


            <OrdersSlider orders={orders}/>


          <Box style={{display:"flex", justifyContent:"center"}}>
            <Card
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ padding: "0px 0px", border:"0", boxShadow:"0", position:"absolute", top:"55vh"}}
        >
          <Button onClick={() => calculateRoute()}>Calcular ruta</Button>
          {distance ? <FormLabel>distancia: {distance}</FormLabel> : null}
          {duration ? <FormLabel>duracion: {duration}</FormLabel> : null}
          <IconButton
            children={<NearMeIcon />}
            onClick={() => map.panTo(center)}
          />
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerStyle={{ width: "80vw", height: "40vh" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            <MarkerF position={center} />
          </GoogleMap>
        </Card>
        </Box>
            

      </Box>
    </div>

  );
}
