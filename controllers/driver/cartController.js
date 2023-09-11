const Driver = require("../../models/driver");
const Product = require("../../models/product");
const Vendor = require("../../models/vendor");

const viewCart = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.userId })
      .populate("cart.productId")
      .populate("cart.vendorId");
    if (driver.cart.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
      });
    }
    res.status(200).json({
      success: true,
      cart: driver.cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

const addToCart = async (req, res) => {
  const { productId, vendorId } = req.body;

  try {
    // for checking provided productId and vendorId exist in the database
    const productExist = await Product.findOne({ _id: productId });
    const vendorExist = await Vendor.findOne({ _id: vendorId });

    // product and vendor exist in the db
    if (productExist && vendorExist) {
      try {
        const driver = await Driver.findOne({ _id: req.userId });
        const item = {
          productId,
          vendorId,
          quantity: 1,
        };
        // cart is empty
        if (driver.cart.length === 0) {
          driver.cart.push(item);
          await driver.save();
          return res.status(201).json({
            success: true,
            message: "Item added to cart",
            cart: driver.cart,
          });
        }
        // cart is not empty then check item already exist in the cart - (same product and  same vendor)
        const existingIndex = driver.cart.findIndex((item) => {
          return (
            item.productId.valueOf() === `${productId}` &&
            item.vendorId.valueOf() === `${vendorId}`
          );
        });
        //  item is not in the cart - ( different product or different vendor )
        if (existingIndex === -1) {
          driver.cart.push(item);
          await driver.save();
          return res.status(201).json({
            success: true,
            message: "Item added to cart",
            cart: driver.cart,
          });
        }
        // item is already in the cart - same product for same vendor - increase the quantity
        driver.cart[existingIndex].quantity += 1;
        await driver.save();
        return res.status(200).json({
          success: true,
          message: "Cart is updated",
          cart: driver.cart,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          messagge: "Internal server error",
        });
      }
    }
    return res.status(404).json({
      success: false,
      message: `Product or Vendor not found`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

const cartItemIncrement = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findOne({ _id: req.userId });
    const existingIndex = driver.cart.findIndex((item) => {
      return item._id.valueOf() === `${id}`;
    });
    if (existingIndex == -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    driver.cart[existingIndex].quantity += 1;
    await driver.save();
    res.status(200).json({
      success: true,
      cart: driver.cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

const cartItemDecrement = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findOne({ _id: req.userId });
    const existingIndex = driver.cart.findIndex((item) => {
      return item._id.valueOf() === `${id}`;
    });
    if (existingIndex == -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    if (driver.cart[existingIndex].quantity === 1) {
      driver.cart.splice(existingIndex, 1);
      await driver.save();
      return res.status(200).json({
        success: true,
        cart: driver.cart,
      });
    }
    driver.cart[existingIndex].quantity -= 1;
    await driver.save();
    res.status(200).json({
      success: true,
      cart: driver.cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findOne({ _id: req.userId });
    const existingIndex = driver.cart.findIndex((item) => {
      return item._id.valueOf() === `${id}`;
    });
    if (existingIndex == -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    driver.cart.splice(existingIndex, 1);
    await driver.save();
    return res.status(200).json({
      success: true,
      message: "Item removed",
      cart: driver.cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messagge: "Internal server error",
    });
  }
};

module.exports = {
  viewCart,
  addToCart,
  cartItemIncrement,
  cartItemDecrement,
  removeCartItem,
};
