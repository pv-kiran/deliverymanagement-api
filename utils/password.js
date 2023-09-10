const bcrypt = require("bcryptjs");

const getSecurePassword = async (password) => {
  const securePassword = await bcrypt.hash(password, 10);
  return securePassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isCorrect = await bcrypt.compare(password, hashedPassword);
  return isCorrect;
};

module.exports = {
  getSecurePassword,
  verifyPassword,
};
