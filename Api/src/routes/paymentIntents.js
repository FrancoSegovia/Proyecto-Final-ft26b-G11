const express = require("express");
const router = express.Router();
const Order = require("../schema/Order")
const User = require("../schema/User")

const stripe = require("stripe")("sk_test_51LUzvLBavWXziNSX8gZes2m9QGJNjDfDlhsFDxRWZ4eEzVdnuf5J7p7V2dRQRdl3cMbvwHjVZVZQwr88cJ5MloZh00pyWaEjvq");

router.post("/", async (req, res) => {
  try {
     const { id, amount, user, cart } = req.body


     
     const payment = await stripe.paymentIntents.create({
      amount,
      currency: "ARS",
      payment_method: id, 
      confirm: true
     })

     const destination = new Order({
      order: user,
      state: "Buscando repartidor"
     })

    await destination.save()
     
     const findUser = await User.findOne({_id: user})
    
     findUser.order = findUser.order.concat(destination._id)
    
     await findUser.save()
   
     res.send({message: "payment succesfull"})
   } catch (error) {
      console.log("soy error", error)
      res.status(400).json({message: error.message})
  }
  })

module.exports = router;