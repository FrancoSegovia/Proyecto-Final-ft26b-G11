import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import { Grid, TextField, Typography } from "@mui/material";

export default function AddressForm() {
  let [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
  });

  useEffect(() => {
    let token = jwtDecode(localStorage.getItem("token"));
    setForm({
      firstName: token.name,
      lastName: token.lastname,
      address1: token.direction,
      address2: token.email,
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Datos de Usuario y Envio
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            label="Nombre/s"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            label="Apellido/s"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            value={form.address1}
            onChange={handleChange}
            label="Direccion"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address2"
            name="address2"
            value={form.address2}
            onChange={handleChange}
            label="Correo electronico"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}
