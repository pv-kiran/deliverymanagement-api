const express = require("express");
const router = express.Router();

const { isLoggedIn, isDriver } = require("../middleware/authMiddleware");
// vendor related controller logic
const {
  viewVendors,
  viewVendor,
} = require("../controllers/driver/vendorController");
// driver profile related controller logic
const {
  viewProfile,
  updateProfile,
} = require("../controllers/driver/profileController");

// @Type - GET
// description - View all vendors
router.get("/view/vendors", isLoggedIn, isDriver, viewVendors);

// Type - GET
// description - View a vendor
router.get("/view/vendor/:id", isLoggedIn, isDriver, viewVendor);

// Type - GET
// description - View driver profile (my profile)
router.get("/profile/:id", isLoggedIn, isDriver, viewProfile);

// Type - PUT
// description - Update the driver profile
router.put("/profile/:id", isLoggedIn, isDriver, updateProfile);

module.exports = router;
