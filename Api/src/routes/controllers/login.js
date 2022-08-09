const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()



const userSchema = require("../../schema/Users")

loginRouter.post("/" , (req, res) => {
    const {body} = req
    const {name, password} = body

    const user = userSchema.findOne({ name })

    const passwordCorrect = user === null
     ? false
     : bcrypt.compare(password, user.password)

     if(!passwordCorrect) {
        res.status(401).json({
            error: "invalid user or password"
        })
     }

     res.send({
        name: user.name
     })
})

module.exports = loginRouter