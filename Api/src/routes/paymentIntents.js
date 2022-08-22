const express = require("express");
const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51LUzvLBavWXziNSX8gZes2m9QGJNjDfDlhsFDxRWZ4eEzVdnuf5J7p7V2dRQRdl3cMbvwHjVZVZQwr88cJ5MloZh00pyWaEjvq"
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

    res.send({ message: "El Pago se ha realizado con exito!" });
  } catch (error) {
    console.error("soy error", error);
    res.status(400).json({ message: error.raw.message });
  }
});

module.exports = router;
