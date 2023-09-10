const jwt = require("jsonwebtoken");

const getToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });
};

module.exports = {
  getToken,
};
