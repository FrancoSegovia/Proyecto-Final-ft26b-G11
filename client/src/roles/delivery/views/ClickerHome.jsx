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
import { getAllShops } from "../../../redux/actions/index.js";
import {
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

export default function Home() {

  const center = { lat: -38.717621879595484, lng: -62.265517288258536 };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const error = useSelector((state) => state.error);
  const [map, setMap] = useState(/**@type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const origen = { lat: -38.700129306504365, lng: -62.24152452874228 };

  //? const destino = (direccion del cliente)

  useEffect(() => {
    dispatch(getAllShops());
  }, []);

  // eslint-disable-next-line no-undef
  if (!isLoaded) return <Typography>Loading...</Typography>;

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
    <>
      <Navbar />
      <div
        style={{
          marginTop: "75px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Grid
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ marginBottom: "20px", padding: "35px 0px" }}
        >
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              align="left"
              component="h3"
              color="textPrimary"
            >
              Monedero
            </Typography>
            <Typography
              variant="h4"
              align="left"
              component="h4"
              color="textSecondary"
            >
              $100
            </Typography>
          </Grid>

          <Grid item xs={3.5} style={{ textAlign: "center" }}>
            <OrdersSlider />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          direction="row"
          rowSpacing={1}
          style={{ padding: "35px 0px"}}
        >
          <Button onClick={() => calculateRoute()}>Calcular ruta</Button>
          <FormLabel>distancia: {distance}</FormLabel>
          <FormLabel>duracion: {duration}</FormLabel>
          <IconButton
            children={<NearMeIcon />}
            onClick={() => map.panTo(center)}
          />
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerStyle={{ width: "50vw", height: "60vh" }}
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
        </Grid>
      </div>
    </>
  );
}
