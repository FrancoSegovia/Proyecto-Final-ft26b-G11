import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addProduct, addStore } from "../../redux/actions"

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {  ArrowBack, Add as AddIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/base";

const theme = createTheme();

export default function AddProduct (shopId) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: null,
    idLocal:""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setNewProduct({
      name: "",
      price: null,
      idLocal:{shopId}
    })
    dispatch(addProduct(newProduct));
    setNewProduct({
      name: "",
      price: null,
      idLocal:""
    })
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Typography component="h1" variant="h5">
            CREAR NUEVO PRODUCTO
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del producto"
                  name="name"
                  autoComplete="nombre_producto"
                  value={newProduct.name}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  label="Precio del producto"
                  autoComplete="precio_producto"
                  value={newProduct.price}
                  onChange={onInputChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !newProduct.name.length ||
                !newProduct.price
              }
            >
              CREAR NUEVO PRODUCTO
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
