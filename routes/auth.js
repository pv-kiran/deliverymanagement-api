const express = require("express");
const router = express.Router();
// admin authentication controller
const {
  adminSignup,
  adminSignin,
} = require("../controllers/auth/adminController");

// driver authentication controller
const {
  driverSignup,
  driverSignin,
} = require("../controllers/auth/driverController");

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
