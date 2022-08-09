const userSchema = require("../../schema/Users");
const jwt = require("jsonwebtoken")

const post = (req, res, verifyToken) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ msg: error }));

    jwt.sign({user}, "secretkey", (err, token) => {
      res.json({
        token
      })
    })

    // Authorization: Bearer <token>
    function verifyToken (req, res, next) {
      const bearerHeader = req.headers["authorization"];
      
      if(typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
      }else {
        res.status(403)
      }
    }
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if(error){
        res.sendStatus(403);
      }else{
        res.json({
          message: "User created",
          authData
        })
      }
    })

};







const get = (req, res) => {
  const { name } = req.query;
  if (name) {
    userSchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    userSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
};

module.exports = { post, get };
