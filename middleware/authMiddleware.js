const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { verifyToken } = require("../utils/token");
const Driver = require("../models/driver");

const isLoggedIn = (req, res, next) => {
  // token may be in authentication header or in cookies
  const authToken =
    req.headers["authorization"]?.replace("Bearer ", "") || req.cookies.token;
  if (!authToken) {
    return res.status(401).json({
      message: "Token is missing",
    });
  }
  try {
    const decoded = verifyToken(authToken);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

const isDriver = async (req, res, next) => {
  try {
    const user = await Driver.findOne({ _id: req.userId });
    if (user) {
      next();
    } else {
      return res.status(400).json({
        message: "You are not authorized to access this resource",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await Admin.findOne({ _id: req.userId });
    if (user) {
      next();
    } else {
      return res.status(400).json({
        message: "You are not authorized to access this resource",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isDriver,
};
