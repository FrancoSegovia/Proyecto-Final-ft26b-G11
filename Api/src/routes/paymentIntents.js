const express = require("express");
const router = express.Router();
const Order = require("../schema/Order");
const User = require("../schema/User");
require("dotenv").config()
const stripe = require("stripe")(
  process.env.SECRET_KEY_STRIPE
);

router.post("/", async (req, res) => {
  try {
    const { id, amount, user } = req.body;
    
    await stripe.paymentIntents.create({
      amount,
      currency: "ARS",
      payment_method: id,
      confirm: true,
    });

    const destination = new Order({
      order: user,
      state: "Buscando repartidor",
    });

    await destination.save();

    const findUser = await User.findOne({ _id: user });

    findUser.order = findUser.order.concat(destination._id);

    await findUser.save();

    res.status(200).send({ message: "El pago se ha realizado con Exito!" });
  } catch (error) {
    res.status(404).json({ message: "Ha ocurrido un Error en el pago" });
  }
});

module.exports = router;
