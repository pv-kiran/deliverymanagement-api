const express = require("express");
const router = express.Router();

// .................. MIDDLEWARES  .................. //

const { isLoggedIn, isDriver } = require("../middleware/authMiddleware");

// ...................... IMPORTING CONTROLLERS .............. //

// vendor related controller logic - for drivers
const {
  viewVendors,
  viewVendor,
} = require("../controllers/driver/vendorController");
//  profile related controller logic - for drivers
const {
  viewProfile,
  updateProfile,
} = require("../controllers/driver/profileController");
//  cart related controller logic - for drivers
const {
  viewCart,
  addToCart,
  cartItemIncrement,
  cartItemDecrement,
  removeCartItem,
} = require("../controllers/driver/cartController");
// product related controller - for drivers (reusing - logic is already defined in admin related controllers)
const {
  getProducts,
  getProduct,
} = require("../controllers/admin/productController");

// .................... ROUTE CONFIGURATIONS ..................... //

// @Type - GET
// description - View all vendors
router.get("/view/vendors", isLoggedIn, isDriver, viewVendors);

// @Type - GET
// description - View a vendor
router.get("/view/vendor/:id", isLoggedIn, isDriver, viewVendor);

// @Type - GET
// description - View all products
router.get("/view/products", isLoggedIn, isDriver, getProducts);

// @Type - GET
// description - View a product
router.get("/view/product/:id", isLoggedIn, isDriver, getProduct);

// @Type - GET
// description - View driver profile (my profile)
router.get("/profile/:id", isLoggedIn, isDriver, viewProfile);

// @Type - PUT
// description - Update the driver profile
router.put("/profile/:id", isLoggedIn, isDriver, updateProfile);

// @Type - GET
// description - Get the cart details
router.get("/cart", isLoggedIn, isDriver, viewCart);

// @Type - POST
// description - Add product to cart
router.post("/cart", isLoggedIn, isDriver, addToCart);

// @Type - PUT
// description: Update product in the cart - for incrementing the quantity
router.put("/cart/:id/increment", isLoggedIn, isDriver, cartItemIncrement);

// @Type - PUT
// description: Update product in the cart - for decrementing the quantity
router.put("/cart/:id/decrement", isLoggedIn, isDriver, cartItemDecrement);

// @Type - DELETE
// description - Delete product in the cart
router.delete("/cart/:id", isLoggedIn, isDriver, removeCartItem);

module.exports = router;
