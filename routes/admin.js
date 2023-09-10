const express = require("express");
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
// vendor crud related controllers
const {
  getVendor,
  getVendors,
  addVendor,
  updateVendor,
  deleteVendor,
} = require("../controllers/admin/vendorController");
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/admin/categoryController");

//  ................. VENDOR RELATED LOGIC .................. //

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

// .......................... CATEGORY RELATED LOGIC ................... //

// @type : GET
// description - View all category
router.get("/categories", isLoggedIn, isAdmin, getCategories);

// @type : GET
// description - View a category
router.get("/category/:id", isLoggedIn, isAdmin, getCategory);

// @type : POST
// description - Add a category
router.post("/add/category", isLoggedIn, isAdmin, addCategory);

// @type : PUT
// description - Update a category
router.put("/category/:id", isLoggedIn, isAdmin, updateCategory);

// type : DELETE
// description - Delete a category
router.delete("/category/:id", isLoggedIn, isAdmin, deleteCategory);

module.exports = router;
