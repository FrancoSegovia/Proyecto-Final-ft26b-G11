import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { paymentFuncion, clearShoppingCart } from "../../../../redux/actions";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import jwtDecode from "jwt-decode";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function PaymentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  let [buttonText, setButtonText] = useState("Realizar Pago")
  let [complete, setComplete] = useState(false);
  let [error, setError] = useState("");
  let [waiting, setWaiting] = useState(false);

  const handleChange = (e) => {
    setComplete(e.complete);
    if (e.error === undefined) {
      setError("");
    } else {
      setError(e.error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Procesando el Pago")
    setWaiting(true);

    stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      })
      .then(({ paymentMethod }) => {
        let { id } = paymentMethod;
        dispatch(
          paymentFuncion(
            id,
            JSON.parse(localStorage.getItem("total")) * 100,
            jwtDecode(localStorage.getItem("token"))._id,
          ).then(() => {
            setButtonText("Realizar Pago")
            dispatch(clearShoppingCart());
            navigate("/user/home");
            setWaiting(false);
          })
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metodo de Pago
      </Typography>
      <Grid>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <Typography variant="body2">{error}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!complete || error.length || waiting}
            >
              {buttonText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
