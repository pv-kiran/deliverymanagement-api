const { boolean } = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
  },
  driverId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Driver",
    required: true,
  },
  orderItems: [
    {
      productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        required: true,
      },
      vendorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Vendor",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
