import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
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
    phone: null,
    direction: "",
    vehicle: "",
  });

  useEffect(() => {
    const localS = localStorage.getItem("type");
    setUser({ ...user, type: localS });
  }, []);

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
    });
    navigate("/SignIn", { replace: true });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setError(inputCheckout(user));
  };

  const handleGoogleS = (e) => {};
  const handleGoogleE = (e) => {
    console.log(e);
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
              {error.name && error.name}
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirme su Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                  value={user.password}
                />
              </Grid>

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
                !user.name.length ||
                !user.lastname.length ||
                !user.email.length ||
                !user.email.includes("@") ||
                !user.email.includes(".com") ||
                !user.password.length
              }
            >
              Registrarme
            </Button>
            <Box sx={{ mt: 0.5, mb: 3 }}>
              <GoogleLogin
                // disabled
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Registrate con Google (Proximamente) "
                onSuccess={(e) => handleGoogleS(e)}
                onFailure={(e) => handleGoogleE(e)}
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
    </ThemeProvider>
  );
}
