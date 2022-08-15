const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { isValidEmail } = require("../routes/controllers/helpers");

const schema = Schema(
  {
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
      default: true,
    },
  },
  { collection: "admins" }
);

function sendConfirmationEmail(admin) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  var token = jwt.sign({ email: admin.email }, process.env.TOKEN_SECRET);

  const urlConfirm = `${process.env.APIGATEWAY_URL}/account/admin/confirm/${token}`;
  return transporter
    .sendMail({
      from: process.env.MAIL_ADMIN_ADDRESS,
      to: admin.email,
      subject: "Bienvenido a nuestra Plataforma!",
      html: `<p>Confirma tu Email <a href="${urlConfirm}">Confirmar</a></p>`,
    })
    .then(() => admin);
}

function signup(adminInfo) {
  if (!adminInfo.email || !isValidEmail(adminInfo.email))
    throw new Error("email is invalid");
  if (!adminInfo.password) throw new Error("password is required");
  if (!adminInfo.name) throw new Error("name is required");
  if (!adminInfo.lastname) throw new Error("lastname is required");

  return this.findOne({ email: adminInfo.email })
    .then((admin) => {
      if (admin) throw new Error("admin already exists");

      const newAdmin = {
        email: adminInfo.email,
        password: bcrypt.hashSync(adminInfo.password, 9),
        name: adminInfo.name,
        lastname: adminInfo.lastname,
      };
      return this.create(newAdmin);
    })
    .then((adminCreated) => this.sendConfirmationEmail(adminCreated))
    .then((admin) => admin);
}

function confirmAccount(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    email = payload.email;
  } catch (err) {
    throw new Error("invalid token");
  }

  return this.findOne({ email }).then((admin) => {
    if (!admin) throw new Error("admin not found");
    if (admin.emailVerified) throw new Error("admin already verified");

    admin.emailVerified = true;
    return admin.save();
  });
}

function login(email, password) {
  if (!isValidEmail(email)) throw new Error("email is invalid");

  return this.findOne({ email }).then((admin) => {
    if (!admin) throw new Error("incorrect credentials");
    if (!admin.emailVerified) throw new Error("admin is not confirmed");

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) throw new Error("incorrect credentials");

    const adminObject = {
      _id: admin._id,
      email: admin.email,
      emailVerified: admin.emailVerified,
      name: admin.name,
      lastname: admin.lastname,
    };
    const accessToken = jwt.sign(
      Object.assign({}, adminObject),
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

module.exports = model("Admin", schema);
