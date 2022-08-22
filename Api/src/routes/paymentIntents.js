const express = require("express");
const router = express.Router();
const Order = require("../schema/Order");
const User = require("../schema/User");

const stripe = require("stripe")(
  process.env.SECRET_KEY_STRIPE
);

router.post("/", async (req, res) => {
  try {
    const { id, amount, user } = req.body;

    const payment = await stripe.paymentIntents.create({
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

    res.status(200).send({ message: "payment succesfull" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
