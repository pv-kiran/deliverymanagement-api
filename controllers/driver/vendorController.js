const Vendor = require("../../models/vendor");

const viewVendors = async (req, res) => {
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

const viewVendor = async (req, res) => {
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

module.exports = {
  viewVendors,
  viewVendor,
};
