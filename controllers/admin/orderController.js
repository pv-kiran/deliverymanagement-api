const Order = require("../../models/order");
const Product = require("../../models/product");

const viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate(
      "driverId orderItems.productId orderItems.vendorId",
      "-password"
    );
    if (orders.length === 0) {
      res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const viewOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id }).populate(
      "driverId orderItems.productId orderItems.vendorId",
      "-password"
    );
    if (order) {
      return res.status(200).json({ success: true, order });
    }
    return res.status(404).json({
      success: false,
      message: "No order found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const approveOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id }).populate(
      "driverId orderItems.productId orderItems.vendorId",
      "-password"
    );
    if (order) {
      order.isApproved = true;
      await order.save();
      return res.status(200).json({ success: true, approvedOrder: order });
    }
    return res.status(404).json({
      success: false,
      message: "No order found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id }).populate(
      "driverId orderItems.productId orderItems.vendorId",
      "-password"
    );
    if (order) {
      // order is already cancelled
      if (order.isCancelled) {
        return res.status(400).json({
          success: false,
          message: "Order is already cancelled",
        });
      }
      order.isCancelled = true;
      await order.save();
      // update stock - on cancelling the order
      const updateStock = async (productId, quantity) => {
        const product = await Product.findOne({ _id: productId });
        product.stock = product.stock + quantity;
        product.save({ validateBeforeSave: false });
      };
      // updating the product stock once the order is success
      order.orderItems.forEach(async (item) => {
        await updateStock(item.productId.id, item.quantity);
      });
      // returning the cancelled order details
      return res.status(200).json({ success: true, canceledOrder: order });
    }
    return res.status(404).json({
      success: false,
      message: "No order found",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  viewAllOrders,
  viewOrder,
  approveOrder,
  cancelOrder,
};
