const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  drivingLicence: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: String,
    },
  },
  cart: [
    {
      productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
      },
      vendorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Vendor",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  token: {
    type: String,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
