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
import { useDispatch} from 'react-redux';
import { signIn } from '../../redux/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const theme = createTheme();

export default function SignIn() {

  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    eMail: "",
    password: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn(creds));
    setCreds({
      eMail: "",
      password: ""
    })

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="eMail"
              autoComplete="email"
              autoFocus
              value={creds.eMail}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
             <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Button variant="contained" startIcon={<ArrowBack />}>
                    Regresar
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Link to="/" variant="body2">
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}