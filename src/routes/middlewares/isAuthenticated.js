const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const access_token = req.headers.access_token;
  if (!access_token)
    return res
      .status(403)
      .send({ success: false, message: "not Authorized" });

  if (access_token) {
    const owner = verifyAuthToken(access_token);
    if (!owner)
      return res
        .status(403)
        .send({ success: false, message: "not Authorized" });

    req.owner = owner;
  }

  next();
}

function verifyAuthToken(token) {
  var owner = null;
  try {
    owner = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {}

  return owner;
}

module.exports = isAuthenticated;
