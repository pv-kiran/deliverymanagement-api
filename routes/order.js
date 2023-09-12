const express = require("express");
const router = express.Router();

const { isLoggedIn, isDriver } = require("../middleware/authMiddleware");

const {
  createOrder,
  viewAllOrders,
  cancelOrder,
  viewOrder,
} = require("../controllers/driver/orderController");

// @Type - POST
// description - create/make an order : Driver action
router.post("/new/driver", isLoggedIn, isDriver, createOrder);

// @Type - GET
// description - Get all orders by driver
router.get("/all/driver", isLoggedIn, isDriver, viewAllOrders);

// @ Type - GET
// description - Get single order by driver
// Parameter - orderId
router.get("/:id/driver", isLoggedIn, isDriver, viewOrder);

// @ Type - PUT
// description - cancell an order by driver
router.put("/:id/driver", isLoggedIn, isDriver, cancelOrder);

module.exports = router;
