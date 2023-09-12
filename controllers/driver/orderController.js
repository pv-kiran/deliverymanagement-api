const Driver = require("../../models/driver");
const Order = require("../../models/order");
const Product = require("../../models/product");

const createOrder = async (req, res) => {
  try {
    const driver = await Driver.findOne(
      { _id: req.userId },
      { password: 0 }
    ).populate("cart.productId");
    if (driver.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty, nothing to make an order",
      });
    }
    // shipping address - since the order is made by driver, driver's address is selected as shipping address
    const shippingInfo = driver.address;
    // find out the total amount of the order
    const totalAmount = driver.cart.reduce((total, item) => {
      return total + item.quantity * item.productId.price;
    }, 0);

    // placing neworder
    const newOrder = await Order.create({
      driverId: req.userId,
      shippingInfo,
      totalAmount,
      orderItems: driver.cart,
    });
    // updating the product stock once the order is success
    const updateStock = async (productId, quantity) => {
      const product = await Product.findOne({ _id: productId });
      product.stock = product.stock - quantity;
      product.save({ validateBeforeSave: false });
    };
    // updating the product stock once the order is success
    newOrder.orderItems.forEach(async (item) => {
      await updateStock(item.productId, item.quantity);
    });

    // clearing the cart
    driver.cart = [];
    await driver.save();

    // to return the driver  details, product details and vendor details
    await newOrder.populate(
      "driverId orderItems.vendorId orderItems.productId orderItems.productId.category",
      "-password"
    );

    res.json({ suceess: true, newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

const viewAllOrders = async (req, res) => {
  try {
    const driverOrders = await Order.find({ driverId: req.userId }).populate(
      "driverId orderItems.productId orderItems.vendorId",
      "-password"
    );
    if (driverOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this driver",
      });
    }
    res.status(200).json({ success: true, driverOrders });
  } catch (err) {
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

const viewOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const driverOrder = await Order.findOne({
      _id: id,
      driverId: req.userId,
    }).populate(
      "driverId orderItems.productId orderItems.vendorId",
      "-password"
    );
    if (driverOrder) {
      res.status(200).json({ success: true, driverOrder });
    }
    return res.status(404).json({
      success: false,
      message: "No order found",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const driverOrder = await Order.findOne({
      _id: id,
      driverId: req.userId,
    }).populate(
      "driverId orderItems.productId orderItems.vendorId",
      "-password"
    );
    if (driverOrder) {
      await driverOrder.save();
      driverOrder.isCancelled = true;
      // update stock - on cancelling the order
      const updateStock = async (productId, quantity) => {
        const product = await Product.findOne({ _id: productId });
        product.stock = product.stock + quantity;
        product.save({ validateBeforeSave: false });
      };
      // updating the product stock once the order is success
      driverOrder.orderItems.forEach(async (item) => {
        await updateStock(item.productId.id, item.quantity);
      });
      return res.status(200).json({
        success: true,
        message: "Order is cancelled",
        canceledOrder: driverOrder,
      });
    }
    return res.status(404).json({
      success: false,
      message: "No order found",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

module.exports = {
  createOrder,
  viewAllOrders,
  viewOrder,
  cancelOrder,
};
