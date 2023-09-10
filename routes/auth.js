const express = require("express");
const {
  adminSignup,
  adminSignin,
  driverSignin,
  driverSignup,
} = require("../controllers/authController");
const router = express.Router();

// @type : POST
// description : Admin registration
router.post("/admin/signup", adminSignup);

// @type : POST
// description :  Admin signin
router.post("/admin/signin", adminSignin);

// @type : POST
// description : Driver registration
router.post("/driver/signup", driverSignup);

// @type : POST
// description :  Doctor signin
router.post("/driver/signin", driverSignin);

module.exports = router;
