import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elemets, CardElement } from "@stripe/react-stripe-js";

//Abajo va una key de stripe
//const stipePromise = loadStripe("key")

export default function Payment() {
  return <>"Pasarela con stripe"</>;
  // return (
//     <>
//         <Elements stripe={sripePromise}>
//         <PaymentForm>
//         </Elements>
//     </>
}

//export default function PaymentForm(seguro recibe algo){
//
// const handleSubmit = (e) => {
//      e.preventDefault();
//  }
//
// return (
//     <>
//      <form onSumbit={handleSubmit}>
//          <CardElement/>
//          <button>Buy</button>
//      <form>
//     </>
// )
// }
