const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isValidEmail } = require("../routes/controllers/helpers");

const ownerSchema = mongoose.Schema({
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
});

const localSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  schedule: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  owner: {
    type: Schema.ObjectId,
    ref: "owner",
  },
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    // required: false,
  },
  description: {
    type: String,
    // required: false,
  },
  image: {
    type: String,
    // required: false,
  },
  price: {
    type: Number,
    // required: false,
  },
  type: [
    {
      type: String,
      // required: false,
    },
  ],
  local: {
    type: Schema.ObjectId,
    ref: "local",
  },
});

//!------NO ESTA ANDANDO--------------------
// ownerSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id;
//     delete returnedObject._id;
//     delete returnedObject.__v;
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
      subject: "Please, confirm your email!",
      html: `<p>Confirm your Email <a href="${urlConfirm}">Confirm</a></p>`,
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

function login(email, password) {
  if (!isValidEmail(email)) throw new Error("email is invalid");

  return this.findOne({ email }).then((owner) => {
    if (!owner) throw new Error("incorrect credentials");
    if (!owner.emailVerified) throw new Error("owner is not confirmed");

    const isMatch = bcrypt.compareSync(password, owner.password);
    if (!isMatch) throw new Error("incorrect credentials");

    const ownerObject = {
      _id: owner._id,
      email: owner.email,
      emailVerified: owner.emailVerified,
      name: owner.name,
      lastname: owner.lastname,
    };
    const accessToken = jwt.sign(
      Object.assign({}, ownerObject),
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

function findOwnerById(_id) {
  return this.findById(_id).then((owner) => {
    return {
      _id: owner._id,
      email: owner.email,
      emailVerified: owner.emailVerified,
      name: owner.name,
      lastname: owner.lastname,
    };
  });
}

//?--------------metodos CRUD-----------------

function addLocal(localInfo, ownerId) {
  if (!localInfo.name) throw new Error("name is required");
  localInfo.owner = ownerId;
  console.log(localInfo.owner);
  const local = new this(localInfo);
  return local.save();
}

ownerSchema.statics.signup = signup;
ownerSchema.statics.sendConfirmationEmail = sendConfirmationEmail;
ownerSchema.statics.confirmAccount = confirmAccount;
ownerSchema.statics.login = login;
ownerSchema.statics.findOwnerById = findOwnerById;
localSchema.statics.addLocal = addLocal;
// ownerSchema.statics.deleteLocal = deleteLocal;

module.exports = mongoose.model("owner", ownerSchema);
module.exports = mongoose.model("local", localSchema);
module.exports = mongoose.model("product", productSchema);
