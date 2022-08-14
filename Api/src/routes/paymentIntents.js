const express = require("express");
const router = express.Router();

const stripe = require("stripe")("sk_test_51LUzvLBavWXziNSX8gZes2m9QGJNjDfDlhsFDxRWZ4eEzVdnuf5J7p7V2dRQRdl3cMbvwHjVZVZQwr88cJ5MloZh00pyWaEjvq");

router.post("/", async (req, res) => {
  try {
   
     const { id, amount } = req.body;
  
     const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Food",
      payment_method: id, 
      confirm: true
     })
     console.log(payment)
     res.send({message: "paymente succesfull"})
   } catch (error) {
      console.log(error)
      res.json({message: error.raw.message})
  }
   
  })

module.exports = router;