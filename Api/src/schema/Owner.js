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
    local: {
      type: Schema.ObjectId,
      ref: "Local",
    },
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
      };
      return this.create(newOwner);
    })
    .then((ownerCreated) => this.sendConfirmationEmail(ownerCreated))
    .then((owner) => owner);
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

// function login(email, password) {
//   if (!isValidEmail(email)) throw new Error("email is invalid");

//   return this.findOne({ email }).then((owner) => {
//     if (!owner) throw new Error("incorrect credentials");
//     if (!owner.emailVerified) throw new Error("owner is not confirmed");
//     if (user.isBanned === true) throw new Error("user is banned")
//     const isMatch = bcrypt.compareSync(password, owner.password);
//     if (!isMatch) throw new Error("incorrect credentials");

//     const ownerObject = {
//       _id: owner._id,
//       email: owner.email,
//       emailVerified: owner.emailVerified,
//       name: owner.name,
//       lastname: owner.lastname,
//     };
//     const accessToken = jwt.sign(
//       Object.assign({}, ownerObject),
//       process.env.TOKEN_SECRET,
//       {
//         expiresIn: 60 * 60 * 10,
//       }
//     );
//     return {
//       accessToken,
//     };
//   });
// }

function findOwnerById(_id) {
  return this.findById(_id).then((owner) => {
    return owner;
  });
}

schema.statics.signup = signup;
schema.statics.sendConfirmationEmail = sendConfirmationEmail;
schema.statics.confirmAccount = confirmAccount;
// schema.statics.login = login;
schema.statics.findOwnerById = findOwnerById;

module.exports = model("Owner", schema);
