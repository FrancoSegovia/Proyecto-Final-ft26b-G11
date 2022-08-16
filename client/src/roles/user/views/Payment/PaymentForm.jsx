import React from "react";

import { useDispatch } from "react-redux";
import { paymentFuncion } from "../../../../redux/actions";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, Grid } from "@mui/material";

import StripeForm from "./StripeForm";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function PaymentForm() {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();

    stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      })
      .then((PaymentMethod) => {
        const { id } = PaymentMethod;
        dispatch(paymentFuncion(id, JSON.parse(localStorage.getItem("total"))));
      })
      .catch((error) => console.error(error));
  };


  const handleChange = () => {
    console.log(elements.getElement(CardElement))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metodo de Pago
      </Typography>
      <Grid>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <CardElement onChange={handleChange}/>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Realizar Pago
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
