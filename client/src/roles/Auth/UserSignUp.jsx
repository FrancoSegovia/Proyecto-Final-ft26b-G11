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
import { useDispatch, useSelector } from 'react-redux';
import { signUpDelivery, signUpOwner, signUpUser } from "../../redux/actions";
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state_user = useSelector(state => state.user)

  const [user, setUser] = React.useState({
  type: "user",
  name:"",
  lastname: "",
  email: "",
  password: "",
  phone: null,
  // vehicle: ""
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    if(user.type === "owner"){
      dispatch(signUpOwner(user));
    }else if (user.type==="user"){
      dispatch(signUpUser(user))
    }else dispatch(signUpDelivery(user))

    setUser({
        type: "user",
        name:"",
        lastname: "",
        email: "",
        password: "",
        phone: null,
        // vehicle: ""
    })
    navigate("/SignIn", { replace: true })
  };

  const handleChange = (event) => {
    event.preventDefault();
      setUser({
        ...user,
        [event.target.name]: event.target.value})
  };

  const onSelect = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

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
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={user.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={user.password}
                />
              </Grid>
              {state_user.type === "delivery" && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  autoComplete="new-phone"
                  onChange={handleChange}
                  value={user.phone}
                />
              </Grid>
              )}
              {state_user.type === "delivery" && (
                <Select value={user.vehicle} onChange={onSelect} name={"vehicle"}>
                  <MenuItem value={"AUTO"}>Comida</MenuItem>
                  <MenuItem value={"MOTO"}>Bebida</MenuItem>
                </Select>
              )}
            </Grid>
            {/* <Link to="/landing" style={{ textDecoration: "none", color: "white" }}> */}
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 3 }}
                disabled= {!user.name.length || !user.lastname.length || !user.email.length || !user.email.includes("@") || !user.email.includes(".com") || !user.password.length}
              >
                Registrarme
              </Button>
            {/* </Link> */}
             <Grid container justifyContent="flex-end" style={{marginBottom:"15px"}}>
              <Grid item>
                <Link to="/landing" style={{ textDecoration: "none", color: "white" }}>
                  <Button variant="contained" startIcon={<ArrowBack />}>
                    Regresar
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/SignIn" style={{ textDecoration: "none"}}>
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