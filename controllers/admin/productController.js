const Product = require("../../models/product");
const { cloudinary } = require("../../utils/cloudinaryHelper");
const {
  validateProductCreation,
  validateProductUpdate,
} = require("../../utils/validation");

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productExist = await Product.findOne({ _id: id }).populate(
      "category"
    );
    if (productExist) {
      return res.status(200).json({
        success: true,
        productExist,
      });
    }
    res.status(404).json({
      success: false,
      message: "No product found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({}).populate("category");
    if (allProducts.length > 0) {
      return res.status(200).json({
        success: true,
        allProducts,
      });
    }
    res.status(404).json({
      success: false,
      message: "No Vendors found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addProduct = async (req, res) => {
  const { error } = validateProductCreation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }

  try {
    const { name } = req.body;
    const productExist = await Product.findOne({ name: name });
    if (productExist) {
      return res
        .status(409)
        .json({ success: false, message: "Product already exists" });
    }
    // uploading the file to cloudinary
    const result = await cloudinary.uploader.upload(
      req.files.productImg.tempFilePath,
      { folder: "products" }
    );
    const newProduct = await (
      await Product.create({
        ...req.body,
        image: { secure_url: result.secure_url, public_id: result.public_id },
      })
    ).populate("category");
    return res.status(201).json({ success: true, newProduct });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { error } = validateProductUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  if (req.files) {
    const productImg = req.files.productImg;

    // only image files -
    if (!productImg.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }
    try {
      // pending - writng the logic for removing the previous image from cloudinary
      const result = await cloudinary.uploader.upload(productImg.tempFilePath, {
        folder: "products",
      });
      req.body.image = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server error",
      });
    }
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("category");
    if (updatedProduct) {
      return res.status(200).json({
        success: true,
        updatedProduct,
      });
    }
    res.status(404).json({
      success: false,
      message: "No product found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedproduct = await Product.findByIdAndDelete(id);
    // pending - writng the logic for destrying the image from cloudinary
    if (deletedproduct) {
      return res.status(200).json({
        success: true,
        message: "Product is deleted",
      });
    }
    // await cloudinary.uploader.destroy(deleteProduct.im);
    res.status(404).json({
      success: false,
      message: "Product not found",
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
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
