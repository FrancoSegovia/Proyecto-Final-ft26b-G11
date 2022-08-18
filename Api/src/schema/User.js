const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { isValidEmail } = require("../routes/controllers/helpers");
const ownerSchema = require("../schema/Owner");
const userSchema = require("../schema/User");
const deliverySchema = require("../schema/Delivery")
const productSchema = require("../schema/Product");

const schema = Schema(
  {
    type: {
      type: String,
      required: false,
      default: "user"
    },
    direction: {
      type: String,
      required: true,
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
    phone: {
      type: Number,
      required: false,
    },
    cart: [ {
      
        
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: false
            },

            amount: {
                type: Number,
                default: 1
            },
        
  }]
    
    // favorites: {
    //   type: Array,
    //   default: undefined,
    // },
    // comments: {
    //   type: Array,
    //   default: undefined,
    // },
    // paymentRecord: {
    //   type: String,
    //   required: false,
    // },
    // balance: {
    //   type: Number,
    //   required: false,
    // },
    // credentials: [
    //   {
    //     name: {
    //       type: String,
    //       required: false,
    //     },
    //     number: {
    //       type: Number,
    //       required: false,
    //     },
    //     code: {
    //       type: Number,
    //       required: false,
    //     },
    //     dateOfExpire: {
    //       type: Date,
    //       required: false,
    //     },
    //   },
    // ],
  },
  { collection: "users" }
);

function sendConfirmationEmail(user) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  var token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET);

  const urlConfirm = `${process.env.APIGATEWAY_URL}/account/user/confirm/${token}`;
  return transporter
    .sendMail({
      from: process.env.MAIL_ADMIN_ADDRESS,
      to: user.email,
      subject: "Bienvenido a nuestra Plataforma!",
      html: `<p>Confirma tu Email <a href="${urlConfirm}">Confirmar</a></p>`,
    })
    .then(() => user);
}

function signup(userInfo) {
  if (!userInfo.email || !isValidEmail(userInfo.email))
    throw new Error("email is invalid");
  if (!userInfo.password) throw new Error("password is required");
  if (!userInfo.name) throw new Error("name is required");
  if (!userInfo.lastname) throw new Error("lastname is required");

  return this.findOne({ email: userInfo.email })
    .then((user) => {
      if (user) throw new Error("user already exists");

      const newUser = {
        direction: userInfo.direction,
        type: userInfo.type,
        email: userInfo.email,
        password: bcrypt.hashSync(userInfo.password, 9),
        name: userInfo.name,
        lastname: userInfo.lastname,
      };
      return this.create(newUser);
    })
    .then((userCreated) => this.sendConfirmationEmail(userCreated))
    .then((user) => user);
}

function confirmAccount(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    email = payload.email;
  } catch (err) {
    throw new Error("invalid token");
  }

  return this.findOne({ email }).then((user) => {
    if (!user) throw new Error("user not found");
    if (user.emailVerified) throw new Error("user already verified");

    user.emailVerified = true;
    return user.save();
  });
}


schema.statics.signup = signup;
schema.statics.sendConfirmationEmail = sendConfirmationEmail;
schema.statics.confirmAccount = confirmAccount;

module.exports = model("User", schema);
