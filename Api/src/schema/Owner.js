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
      default: "owner"
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
    locals: [{
      type: Schema.Types.ObjectId,
      ref: "Local",
    }],
  },
  { collection: "owners" }
);

//!------NO ESTA ANDANDO--------------------
// schema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id;
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject.password
//   },
// });
//!------NO ESTA ANDANDO--------------------

function signup(ownerInfo) {
  if (!ownerInfo.email || !isValidEmail(ownerInfo.email))
    throw new Error("email is invalid");
  if (!ownerInfo.password) throw new Error("password is required");
  if (!ownerInfo.name) throw new Error("name is required");
  if (!ownerInfo.lastname) throw new Error("lastname is required");

  return this.findOne({ email: ownerInfo.email })
    .then((owner) => {
      if (owner) throw new Error("owner already exists");

      const newOwner = {
        email: ownerInfo.email,
        password: bcrypt.hashSync(ownerInfo.password, 9),
        name: ownerInfo.name,
        lastname: ownerInfo.lastname,
        isBanned: ownerInfo.IsBanned
      };
      return this.create(newOwner);
    })
    .then((ownerCreated) => this.sendConfirmationEmail(ownerCreated))
    .then((owner) => owner);
}

function sendConfirmationEmail(owner) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  var token = jwt.sign({ email: owner.email }, process.env.TOKEN_SECRET);

  const urlConfirm = `${process.env.APIGATEWAY_URL}/account/owner/confirm/${token}`;
  return transporter
    .sendMail({
      from: process.env.MAIL_ADMIN_ADDRESS,
      to: owner.email,
      subject: "Bienvenido a nuestra Plataforma!",
      html: `<p>Confirma tu Email <a href="${urlConfirm}">Confirmar</a></p>`,
    })
    .then(() => owner);
}

function confirmAccount(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    email = payload.email;
  } catch (err) {
    throw new Error("invalid token");
  }

  return this.findOne({ email }).then((owner) => {
    if (!owner) throw new Error("owner not found");
    if (owner.emailVerified) throw new Error("owner already verified");

    owner.emailVerified = true;
    return owner.save();
  });
}



function findOwnerById(_id) {
  return this.findById(_id).populate('locals').then((owner) => {
    return owner;
  });
}

schema.statics.signup = signup;
schema.statics.sendConfirmationEmail = sendConfirmationEmail;
schema.statics.confirmAccount = confirmAccount;
schema.statics.findOwnerById = findOwnerById;

module.exports = model("Owner", schema);
