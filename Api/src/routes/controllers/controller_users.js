const userSchema = require("../../schema/Users");

const post = (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ msg: error }));
};

module.exports = { post };