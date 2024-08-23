const jwt = require("jsonwebtoken");
const SECRET_KEY = "gamatecha";

const auth = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        message: "Failed to authenticate token",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { auth };
