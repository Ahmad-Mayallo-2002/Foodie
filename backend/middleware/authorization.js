const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");

config();

const authorization = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] && req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(404).json({ msg: "Token is Not Found or Expired" });
  verify(token, process.env.JWT_KEY, (error, user) => {
    if (error) return res.status(403).json(error);
    req.user = user;
  });
  next();
};

module.exports = authorization;
