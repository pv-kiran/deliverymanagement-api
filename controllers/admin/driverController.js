const Driver = require("../../models/driver");
const { validateDriverUpdate } = require("../../utils/validation");

const viewAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({}, { password: 0 });
    if (drivers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No drivers found",
      });
    }
    return res.status(200).json({ success: true, drivers });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const viewDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findOne({ _id: id }, { password: 0 });
    if (driver) {
      return res.status(200).json({ success: true, driver });
    }
    return res.status(404).json({
      success: false,
      message: "driver not found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { error } = validateDriverUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedDriver) {
      updatedDriver.password = undefined;
      return res.status(200).json({
        success: true,
        updatedDriver,
      });
    }
    res.status(404).json({
      success: false,
      message: "No Driver found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const deleteDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByIdAndDelete({ id });
    if (driver) {
      return res
        .status(200)
        .json({ success: true, message: "Driver is deleted" });
    }
    return res.status(404).json({
      success: false,
      message: "driver not found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  viewAllDrivers,
  viewDriver,
  updateDriver,
  deleteDriver,
};
