const Category = require("../../models/category");
const { categoryValidate } = require("../../utils/validation");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length > 0) {
      return res.status(200).json({ success: true, categories });
    }
    res.status(404).json({ success: false, message: "No categories found" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ _id: id });
    if (category) {
      return res.status(200).json({ success: true, category });
    }
    return res
      .status(404)
      .json({ success: false, message: "No category found" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addCategory = async (req, res) => {
  const { error } = categoryValidate.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { name } = req.body;
  try {
    const categoryExist = await Category.findOne({ name: name });
    if (categoryExist) {
      return res.status(409).json({
        success: false,
        message: "Category already exist",
      });
    }
    const newCategory = await Category.create({ name });
    return res.status(201).json({ success: true, newCategory });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { error } = categoryValidate.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedCategory) {
      return res.status(200).json({ success: true, updatedCategory });
    }
    return res
      .status(404)
      .json({ success: fasle, message: "Category not found" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
      return res
        .status(200)
        .json({ success: true, message: "Category deleted" });
    }
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
