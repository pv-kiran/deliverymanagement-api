const {
  validateVendorCreation,
  validateVendorUpdate,
} = require("../utils/validation");

const Vendor = require("../models/vendor");

const getVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const vendorExist = await Vendor.findOne({ _id: id });
    if (vendorExist) {
      return res.status(200).json({
        success: true,
        vendorExist,
      });
    }
    res.status(404).json({
      success: false,
      message: "No vendor found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error",
    });
  }
};

const getVendors = async (req, res) => {
  try {
    const allVendors = await Vendor.find({});
    if (allVendors.length > 0) {
      return res.status(200).json({
        success: true,
        allVendors,
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

const addVendor = async (req, res) => {
  const { error } = validateVendorCreation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }

  try {
    const { email, mobile } = req.body;
    const vendorExist = await Vendor.findOne({
      $or: [{ email: email, mobile: mobile }],
    });
    if (vendorExist) {
      return res
        .status(409)
        .json({ success: false, message: "Vendor already exists" });
    }
    const newVendor = await Vendor.create(req.body);
    res.status(201).json({
      success: true,
      newVendor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateVendor = async (req, res) => {
  const { id } = req.params;
  const { error } = validateVendorUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedVendor) {
      return res.status(200).json({
        success: true,
        updatedVendor,
      });
    }
    res.status(404).json({
      success: false,
      message: "No vendor found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const deleteVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(id);
    if (deletedVendor) {
      return res.status(200).json({
        success: true,
        message: "Vendor is deleted",
      });
    }
    res.status(404).json({
      success: false,
      message: "Vendor not found",
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
  getVendor,
  getVendors,
  addVendor,
  updateVendor,
  deleteVendor,
};
