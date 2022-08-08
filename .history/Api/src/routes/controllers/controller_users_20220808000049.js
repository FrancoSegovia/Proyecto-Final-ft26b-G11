const user = require("../../schema/Users");

const userController = {
  show(req, res) {
    const user = userSchema(req.body);
    user
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ msg: error }));
  },
};
