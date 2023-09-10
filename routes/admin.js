const express = require("express");
const router = express.Router();

const {
  getVendor,
  getVendors,
  addVendor,
  updateVendor,
  deleteVendor,
} = require("../controllers/adminController");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");

// @type : GET
//  parameters : verdorId
// description : To view a vendor
router.get("/vendor/:id", isLoggedIn, isAdmin, getVendor);
// @type : GET
// description : To view all vendor
router.get("/vendors", isLoggedIn, isAdmin, getVendors);
// @type : POST
// description : To add a new vendor
router.post("/add/vendor", isLoggedIn, isAdmin, addVendor);
// @type : PUT
//  parameters : verdorId
// description : To upddate a vendor
router.put("/vendor/:id", isLoggedIn, isAdmin, updateVendor);
// @type : DELETE
//  parameters : verdorId
// description : To delete a vendor
router.delete("/vendor/:id", isLoggedIn, isAdmin, deleteVendor);

module.exports = router;
