const RevokedToken = require("../models/revokedToken.model");
const { verifyJWTToken } = require("../utils/jwt.util");

const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: `Please provide authorization header` });
  }
  if (!authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: `Please provide token in valid format` });
  }
  const token = authHeader.split(" ")[1];

  if (!token || token === "null" || token === "undefined") {
    return res.status(401).json({ message: `Please provide token` });
  }

  const revokedToken = await RevokedToken.findOne({ token });

  if (revokedToken) {
    return res.status(401).json({ message: `Token is already revoked` });
  }

  const data = verifyJWTToken(token);
  if (data.error) {
    return res
      .status(401)
      .json({ message: `Please provide valid token - ${data.message}` });
  }
  req.user = data;
  console.log(data);

  next();
};

module.exports = verifyAuth;
