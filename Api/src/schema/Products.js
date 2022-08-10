const localSchema = require("./Locals")
const mongoose = require("mongoose")

const prod = localSchema.pro
console.log("soy pro", prod)

module.exports = mongoose.model("Products", prod)