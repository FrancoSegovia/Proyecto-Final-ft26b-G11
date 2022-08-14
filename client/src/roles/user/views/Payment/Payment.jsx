import React from "react";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elemets, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

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
//  const stripe = useStripe()
//  const elements = useElemets

// const handleSubmit = (e) => {
//      e.preventDefault();
//
//  stripe.createPaymentMethod({
//    type:'card',
//    card: elements.getElement(CardElement)
//  })
//    .then(({error, paymenMethod}) => {
//
//    })
//
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
