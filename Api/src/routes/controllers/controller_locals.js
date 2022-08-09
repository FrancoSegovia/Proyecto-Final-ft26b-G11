const localSchema = require("../../schema/Locals");

const post = (req, res) => {
  const local = localSchema(req.body);
  local
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const get = (req, res) => {
  const { name } = req.query;
  if (name) {
    localSchema
      .find({ name: new RegExp(req.query.name.toLowerCase(), "i") })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } else {
    localSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
};

const getId = (req, res) => {
  const { id } = req.params;
  localSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};



module.exports = { post, get, getId };
