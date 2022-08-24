const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index.js");

// const { isAuthenticated } = require("./routes/middlewares");
require("dotenv").config();
const cors = require("cors")

const app = express();
const port = process.env.PORT || 3001;



//middleware
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => res.send("Hola mundo"))
// app.use(isAuthenticated); //! ACA PODRIA APLICAR EL MIDDLEWARE PARA VALIDAR POR TOKEN TODAS LAS RUTAS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use("/account", routes);

//mongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening on {port}"));

module.exports = app;
