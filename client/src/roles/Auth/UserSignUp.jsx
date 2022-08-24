/*global google*/
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpDelivery, signUpOwner, signUpUser } from "../../redux/actions";
import inputCheckout from "../../utils/functions/inputCheckout";
import jwtDecode from "jwt-decode";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignUp() {
  const center = { lat: -38.71743771634209, lng: -62.26550655942335 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const destinationRef = useRef(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [directionError, setDirectionError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState({
    type: "user",
    name: "",
    lastname: "",
    email: "",
    password: "",
    cPassword: "",
    direction: "",
    vehicle: "",
    isBanned: false,
  });

  useEffect(() => {
    let localS = localStorage.getItem("type");
    setUser({ ...user, type: localS });
  }, []);

  useEffect(() => {
    setError(inputCheckout(user));
  }, [user]);

  if (!isLoaded) return <Typography>Cargando...</Typography>;

  const deliveryTravelMode = google.maps.TravelMode.DRIVING;

  const calculateRoute = async () => {
    if (destinationRef.current.value === "") {
      return;
    }
    if (
      !destinationRef.current.value.includes(
        "Bahía Blanca, Provincia de Buenos Aires, Argentina"
      )
    ) {
      setDirectionError(
        "no se encontró su dirección en Bahia Blanca, intente nuevamente"
      );
      return;
    }
    try {
      setDirectionError("");
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: center,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: deliveryTravelMode,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text); //text o value segun corresponda
      console.log(distance);
      let km = distance.split(" ");
      if (parseInt(km[0]) > 11) {
        setDirectionError(
          "Tu dirección se encuentra fuera de nuestro area de cobertura"
        );
        return;
      }
      setUser({
        ...user,
        direction: destinationRef.current.value,
      });
    } catch (error) {
      console.error(error);
      setDirectionError("no se encontró su dirección, intente nuevamente");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.type === "owner") {
      dispatch(signUpOwner(user));
    } else if (user.type === "user") {
      dispatch(signUpUser(user));
    } else dispatch(signUpDelivery(user));

    setUser({
      type: "user",
      name: "",
      lastname: "",
      email: "",
      password: "",
      direction: "",
      vehicle: "",
      isBanned: false,
    });
    navigate("/SignIn", { replace: true });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSelect = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {user.type === "user"
              ? "Registro de cliente"
              : user.type === "owner"
              ? "Registro de dueño"
              : "Registro de Clicker"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Typography
              component="h6"
              variant="subtitle2"
              align="center"
              sx={{ color: "#a6a6a6" }}
            >
              "*" CAMPOS OBLIGATORIOS
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  onChange={(e) => handleChange(e)}
                  value={user.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Apellido"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={(e) => handleChange(e)}
                  value={user.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Dirección de correo electrónico"
                  name="email"
                  autoComplete="eMail"
                  onChange={(e) => handleChange(e)}
                  value={user.email}
                />
                {error.email && (
                  <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    sx={{ color: "#FF0000" }}
                  >
                    {error.email}
                  </Typography>
                )}
              </Grid>
              {(user.type === "user" || user.type === "owner") && (
                <Grid item xs={12}>
                  <Autocomplete>
                    <TextField
                      required
                      fullWidth
                      name="direction"
                      label="Dirección"
                      id="direction"
                      autoComplete="new-direction"
                      inputRef={destinationRef}
                      onBlur={calculateRoute}
                    />
                  </Autocomplete>
                  {directionError && <p>{directionError}</p>}
                </Grid>
              )}

              {user.type === "owner" && (
                <Grid item xs={12}>
                  <PhoneInput
                    align="center"
                    specialLabel=""
                    country="ar"
                    onlyCountries={["ar"]}
                    disableCountryCode={true}
                    value={phone}
                    placeholder="Teléfono"
                    disableDropdown={true}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                  value={user.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cPassword"
                  label="Confirme su Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                  value={user.cPassword}
                />
                {error.cPassword && (
                  <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    sx={{ color: "#FF0000" }}
                  >
                    {error.cPassword}
                  </Typography>
                )}
              </Grid>
              {(user.type === "delivery" || user.type === "users") && (
                <Grid item xs={12}>
                <PhoneInput
                    align="center"
                    specialLabel=""
                    country="ar"
                    onlyCountries={["ar"]}
                    disableCountryCode={true}
                    value={phone}
                    placeholder="Teléfono"
                    disableDropdown={true}
                  />
                </Grid>
              )}

              {user.type === "delivery" && (
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    value={user.vehicle}
                    onChange={onSelect}
                    name={"vehicle"}
                  >
                    <MenuItem value={"AUTO"}>Auto</MenuItem>
                    <MenuItem value={"BICICLETA"}>Bicicleta</MenuItem>
                    <MenuItem value={"MOTO"}>Moto</MenuItem>
                  </Select>
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={
                Object.keys(error).length ||
                directionError
              }
            >
              Registrarme
            </Button>
            <Grid
              container
              justifyContent="flex-end"
              style={{ marginBottom: "15px" }}
            >
              <Grid item>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Button variant="contained" startIcon={<ArrowBack />}>
                    Regresar
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginBottom: "30px", marginTop: "30px" }}
            >
              <Grid item>
                <Link
                  to="/SignIn"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  ¿Ya tienes una cuenta? ¡Inicia sesión!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
