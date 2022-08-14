const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { isValidEmail } = require("../routes/controllers/helpers");

const schema = Schema(
  {
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
    // transport: {
    //   type: String,
    //   required: true,
    // },
    // tel: {
    //   type: Number,
    //   required: true,
    // },
    // shipments: {
    //   type: Number,
    //   required: true,
    // },
  },
  { collection: "deliverys" }
);

function sendConfirmationEmail(delivery) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      delivery: process.env.MAIL_USERNAME,
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

function login(email, password) {
  if (!isValidEmail(email)) throw new Error("email is invalid");

  return this.findOne({ email }).then((delivery) => {
    if (!delivery) throw new Error("incorrect credentials");
    if (!delivery.emailVerified) throw new Error("delivery is not confirmed");
    if (delivery.isBanned === true) throw new Error("delivery is banned")
    const isMatch = bcrypt.compareSync(password, delivery.password);
    if (!isMatch) throw new Error("incorrect credentials");

    const deliveryObject = {
      _id: delivery._id,
      email: delivery.email,
      emailVerified: delivery.emailVerified,
      name: delivery.name,
      lastname: delivery.lastname,
    };
    const accessToken = jwt.sign(
      Object.assign({}, deliveryObject),
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60 * 60 * 10,
      }
    );
    return {
      accessToken,
    };
  });
}

schema.statics.signup = signup;
schema.statics.sendConfirmationEmail = sendConfirmationEmail;
schema.statics.confirmAccount = confirmAccount;
schema.statics.login = login;

module.exports = model("Delivery", schema);

