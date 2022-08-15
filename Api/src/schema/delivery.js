const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { isValidEmail } = require("../routes/controllers/helpers");

const schema = Schema(
  {
    type: {
      type: String,
      required: false,
      default: "delivery"
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    vehicle: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { collection: "deliverys" }
);


function signup(deliveryInfo) {
  if (!deliveryInfo.email || !isValidEmail(deliveryInfo.email))
    throw new Error("email is invalid");
  if (!deliveryInfo.password) throw new Error("password is required");
  if (!deliveryInfo.name) throw new Error("name is required");
  if (!deliveryInfo.lastname) throw new Error("lastname is required");

  return this.findOne({ email: deliveryInfo.email })
    .then((delivery) => {
      if (delivery) throw new Error("delivery already exists");

      const newDelivery = {
        phone: deliveryInfo.phone,
        vehicle: deliveryInfo.vehicle,
        email: deliveryInfo.email,
        password: bcrypt.hashSync(deliveryInfo.password, 9),
        name: deliveryInfo.name,
        lastname: deliveryInfo.lastname,
      };
      return this.create(newDelivery);
    })
    .then((deliveryCreated) => this.sendConfirmationEmail(deliveryCreated))
    .then((delivery) => delivery);
}

function sendConfirmationEmail(delivery) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  var token = jwt.sign({ email: delivery.email }, process.env.TOKEN_SECRET);

  const urlConfirm = `${process.env.APIGATEWAY_URL}/account/delivery/confirm/${token}`;
  return transporter
    .sendMail({
      from: process.env.MAIL_ADMIN_ADDRESS,
      to: delivery.email,
      subject: "Bienvenido a nuestra Plataforma!",
      html: `<p>Confirma tu Email <a href="${urlConfirm}">Confirmar</a></p>`,
    })
    .then(() => delivery);
}

function confirmAccount(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    email = payload.email;
  } catch (err) {
    throw new Error("invalid token");
  }

  return this.findOne({ email }).then((delivery) => {
    if (!delivery) throw new Error("delivery not found");
    if (delivery.emailVerified) throw new Error("delivery already verified");

    delivery.emailVerified = true;
    return delivery.save();
  });
}

schema.statics.signup = signup;
schema.statics.sendConfirmationEmail = sendConfirmationEmail;
schema.statics.confirmAccount = confirmAccount;

module.exports = model("Delivery", schema);

