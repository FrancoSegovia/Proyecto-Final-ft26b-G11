import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { signUpDelivery, signUpOwner, signUpUser } from "../../redux/actions";
import inputCheckout from "../../utils/functions/inputCheckout";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState({});
  const [user, setUser] = useState({
    type: "user",
    name: "",
    lastname: "",
    email: "",
    password: "",
    cPassword: "",
    phone: null,
    direction: "",
    vehicle: "",
    isBanned: false,
  });

  useEffect(() => {
    const localS = localStorage.getItem("type");
    setUser({ ...user, type: localS });
  }, []);

  useEffect(() => {
    setError(inputCheckout(user));
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      phone: null,
      direction: "",
      vehicle: "",
      isBanned: false,
    });
    navigate("/SignIn", { replace: true });
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleGoogleS = (e) => {
    console.log(e)
  };
  const handleGoogleE = (e) => {
    console.log(e)
  };

  const onSelect = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
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
            Registro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                  value={user.name}
                />
              </Grid>
              {error.name && error.name}
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
              {error.lastname && error.lastname}
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
              </Grid>
              {error.email && error.email}
              {user.type === "user" && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="direction"
                    label="Dirección"
                    id="direction"
                    autoComplete="new-direction"
                    onChange={(e) => handleChange(e)}
                    value={user.direction}
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
              {error.password && error.password}
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
              </Grid>
              {error.cPassword && error.cPassword}
              {(user.type === "delivery" || user.type === "users") && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Teléfono"
                    id="phone"
                    autoComplete="new-phone"
                    onChange={(e) => handleChange(e)}
                    value={user.phone}
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
                    <MenuItem value={"MOTO"}>Moto</MenuItem>
                  </Select>
                </Grid>
              )}
            </Grid>
            {/* <Link to="/landing" style={{ textDecoration: "none", color: "white" }}> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={
                Object.keys(error).length ||
                !user.email.includes("@") ||
                !user.email.includes(".com")
              }
            >
              Registrarme
            </Button>
            <Box sx={{ mt: 0.5, mb: 3 }}>
              <GoogleLogin
                buttonText="Registrate con Google (Proximamente) "
                onSuccess={(e) => handleGoogleS(e)}
                onError={(e) => handleGoogleE(e)}
                cookiePolicy={"single_host_origin"}
              />
            </Box>
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
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/SignIn" style={{ textDecoration: "none" }}>
                  ¿Ya tienes una cuenta? ¡Inicia sesión!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </GoogleOAuthProvider>
    </ThemeProvider>
  );
}
