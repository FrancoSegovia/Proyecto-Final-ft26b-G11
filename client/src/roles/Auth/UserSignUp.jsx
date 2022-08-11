import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { signUpOwner, signUpUser } from "../../redux/actions";
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const theme = createTheme();

export default function SignUp() {

  const dispatch = useDispatch();
  const state_user = useSelector(state => state.user)

  const [user, setUser] = React.useState({
    name:"",
    lastName: "",
    eMail: "",
    password: "",
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    if(state_user.type === "owner"){
      dispatch(signUpOwner(user));
    }else if (state_user.type==="user"){
      dispatch(signUpUser(user))
    }

    setUser({
      name:"",
      lastName: "",
      eMail: "",
      password: "",
    })
  };

  const handleChange = (event) => {
    event.preventDefault();
    setUser({
      ...user,
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={user.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={user.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="eMail"
                  label="Email Address"
                  name="eMail"
                  autoComplete="eMail"
                  onChange={handleChange}
                  value={user.eMail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={user.password}
                />
              </Grid>
            </Grid>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled= {!user.name.length || !user.lastName.length || !user.eMail.length || !user.password.length}
              >
                Sign Up
              </Button>
            </Link>
             <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Button variant="contained" startIcon={<ArrowBack />}>
                    Regresar
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link> 
              </Grid> 
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}