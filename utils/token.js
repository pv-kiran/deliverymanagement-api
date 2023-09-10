const jwt = require("jsonwebtoken");

const getToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  getToken,
  verifyToken,
};
