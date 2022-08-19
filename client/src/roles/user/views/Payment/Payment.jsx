import React, { useState } from "react";
import { useNavigate } from "react-router";

import AddressForm from "./AdressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PROMISE);

const steps = ["Revise su Orden", "Direccion de envio", "Detalles del Pago"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Review />;
    case 1:
      return <AddressForm />;
    case 2:
      return (
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      );
    default:
      throw new Error("Paso Desconocido");
  }
}

const theme = createTheme();

export default function Payment() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/user/home")}
            sx={{ mt: 0.2, ml: 0.2 }}
          >
            {"Volver"}
          </Button>
          <Typography component="h1" variant="h4" align="center">
            Verificación
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Atras
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    true
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {"Siguiente"}
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
