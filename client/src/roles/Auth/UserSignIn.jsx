import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn(creds));
    setCreds({
      email: "",
      password: ""
    })
    // navigate('/user/home');
  };


  const handleChange = (event) => {
    event.preventDefault();
    setCreds({
      ...creds,
      [event.target.name]: event.target.value})
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Dirección de correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={creds.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={creds.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 3}}
              disabled={creds.email.trim() === "" || !creds.email.includes("@") || creds.password.trim() === "" ? true : false}
            >
              Iniciar sesión
            </Button>
             <Grid container justifyContent="flex-end" style={{marginBottom:"15px"}}>
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
                <Link to="/SignUp" style={{ textDecoration: "none"}}>
                  ¿Aún no estas registrado? ¡Registrarse!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}