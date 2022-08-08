import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useDispatch } from 'react-redux';
import { addStore } from '../../../../redux/actions';

const theme = createTheme();

export default function CreateStore() {
    const dispatch = useDispatch();
    const [newShop, setNewShop] = useState({
        name:"",
        direction:""
    })

    const onSubmit = e => {
        e.preventDefault();
        dispatch(addStore(newShop));
    }

    const onInputChange = e => {
        e.preventDefault();
        setNewShop({
            ...newShop,
            [e.target.name]: e.target.value,
          });
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
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <AddBusinessIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CREAR NUEVO NEGOCIO
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Nombre del negocio"
                  name="name"
                  autoComplete="nombre_negocio"
                  value={newShop.name}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="direction"
                  label="Dirección del negocio"
                  autoComplete="direccion_negocio"
                  value={newShop.direction}
                  onChange={onInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              CREAR NUEVO NEGOCIO
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" style={{textDecoration:"none", color:"white"}}>
                    <Button variant="contained" startIcon={<ArrowBackIcon/>}>
                        Regresar
                    </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}