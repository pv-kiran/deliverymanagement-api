const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");
const Driver = require("../models/driver");
const { signupValidation, signinValidation } = require("../utils/validation");
const { getToken } = require("../utils/token");
const { getSecurePassword, verifyPassword } = require("../utils/password");

// @type : POST
// description : Admin registration
router.post("/admin/signup", async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  // validation logic
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;
  // checking for the existance of email
  const adminExist = await Admin.findOne({ email: email });
  if (adminExist) {
    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });
  }

  // hashing the password
  const hashedPassword = await getSecurePassword(password);

  // creation of new candidate
  const newCandidate = await Admin.create({
    ...req.body,
    password: hashedPassword,
  });

  newCandidate.password = undefined;

  res.status(201).json({
    sucess: true,
    newCandidate,
  });
});

// @type : POST
// description :  Admin signin
router.post("/admin/signin", async (req, res) => {
  // validation check
  const { error } = signinValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { mobile, password } = req.body;

  // checking the existance of the user
  const adminExist = await Admin.findOne({ mobile: mobile });
  if (adminExist) {
    // checking the passowrd
    const isCorrectPassword = await verifyPassword(
      password,
      adminExist.password
    );
    // password is correct
    if (isCorrectPassword) {
      // token configuration
      const token = getToken(adminExist._id);

      adminExist.token = token;
      adminExist.password = undefined;

      // for cookie configuration
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        user: adminExist,
      });
    }
    // incorrect password
    return res.status(400).json({
      success: false,
      message: "Password is incorrect",
    });
  }
  return res.status(404).json({
    success: false,
    message: `User doesn't exist`,
  });
});

// @type : POST
// description : Driver registration
router.post("/driver/signup", async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  // validation logic
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;
  // checking for the existance of email
  const doctorExist = await Driver.findOne({ email: email });
  if (doctorExist) {
    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });
  }

  // hashing the password
  const hashedPassword = await getSecurePassword(password);

  // creation of new candidate
  const newCandidate = await Driver.create({
    ...req.body,
    password: hashedPassword,
  });

  newCandidate.password = undefined;

  res.status(201).json({
    sucess: true,
    newCandidate,
  });
});

// @type : POST
// description :  Doctor signin
router.post("/doctor/signin", async (req, res) => {
  // validation check
  const { error } = signinValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { mobile, password } = req.body;

  // checking the existance of the user
  const doctorExist = await Driver.findOne({ mobile: mobile });
  if (doctorExist) {
    // checking the passowrd
    const isCorrectPassword = await verifyPassword(
      password,
      doctorExist.password
    );
    // password is correct
    if (isCorrectPassword) {
      // token configuration
      const token = getToken(doctorExist._id);

      doctorExist.token = token;
      doctorExist.password = undefined;

      // for cookie configuration
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        user: doctorExist,
      });
    }
    // incorrect password
    return res.status(400).json({
      success: false,
      message: "Password is incorrect",
    });
  }
  return res.status(404).json({
    success: false,
    message: `User doesn't exist`,
  });
});

module.exports = router;
