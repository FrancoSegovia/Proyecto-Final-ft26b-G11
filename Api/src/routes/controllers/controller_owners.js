const ownerSchema = require("../../schema/owner");

const post = (req, res) => {
  const owner = ownerSchema(req.body);
  owner
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = { post };