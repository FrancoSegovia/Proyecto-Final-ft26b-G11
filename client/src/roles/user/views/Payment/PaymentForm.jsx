import React from "react";
import { useDispatch } from "react-redux";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, Grid } from "@mui/material";
import { paymentFuncion } from "../../../../redux/actions";

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

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <CardElement />
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
    </>
  );
}
