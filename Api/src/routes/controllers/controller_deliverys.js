const deliverySchema = require("../../schema/delivery");

const post = (req, res) => {
  const delivery = deliverySchema(req.body);
  delivery
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = { post };