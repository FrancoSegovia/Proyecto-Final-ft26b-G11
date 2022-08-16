import React from "react";
import PaymentForm from "./PaymentForm";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LUzvLBavWXziNSXlVdW8y5eI5o8aNmA0xHdKeP0KOaLQIc5FHAnSm0moURAUZS4b4302oyeqxv7by9leW2cmddg00kKPu246r"
);

export default function Payment() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </>
  );
}
