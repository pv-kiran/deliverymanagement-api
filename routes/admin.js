const express = require("express");
const router = express.Router();
// middlewares
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
// vendor crud related controllers
const {
  getVendor,
  getVendors,
  addVendor,
  updateVendor,
  deleteVendor,
} = require("../controllers/admin/vendorController");
// category crud related controllers
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/admin/categoryController");
// product crud related controllers
const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/admin/productController");
// order related controllers
const {
  viewAllOrders,
  viewOrder,
  approveOrder,
  cancelOrder,
} = require("../controllers/admin/orderController");

// .................. ROUTE CONFIGURATION .................... //

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

// ................... CATEGORY RELATED LOGIC ................... //

// @type : GET
// description - View a category
// parameters : prodcutId
router.get("/category/:id", isLoggedIn, isAdmin, getCategory);

// @type : GET
// description - View all category
router.get("/categories", isLoggedIn, isAdmin, getCategories);

// @type : POST
// description - Add a category
router.post("/add/category", isLoggedIn, isAdmin, addCategory);

// @type : PUT
// description - Update a category
router.put("/category/:id", isLoggedIn, isAdmin, updateCategory);

// type : DELETE
// description - Delete a category
router.delete("/category/:id", isLoggedIn, isAdmin, deleteCategory);

// .................... PRODUCT RELATED ROUTES ...................... //

// @type : GET
// description - View a product
router.get("/product/:id", isLoggedIn, isAdmin, getProduct);

// @type : GET
// description - View all products
router.get("/products", isLoggedIn, isAdmin, getProducts);

// @type : POST
// description - Add a prodcut
router.post("/add/product", isLoggedIn, isAdmin, addProduct);

// @type : PUT
// description - Add a prodcut
router.put("/product/:id", isLoggedIn, isAdmin, updateProduct);

// @type : DELETE
// description - Delete a product
router.delete("/product/:id", isLoggedIn, isAdmin, deleteProduct);

// .................... ORDER RELATED LOGIC ........................... //

// @ Type - GET
// Description - View all the orders
router.get("/orders", isLoggedIn, isAdmin, viewAllOrders);

// @ Type - GET
// Description - View a specific order :
router.get("/order/:id", isLoggedIn, isAdmin, viewOrder);

// @ Type - PUT
// Description - Approving an order by admin
router.put("/order/:id/approve", isLoggedIn, isAdmin, approveOrder);

// @ Type - PUT
// Description - Canceling an order by admin
router.put("/order/:id/cancel", isLoggedIn, isAdmin, cancelOrder);

module.exports = router;
