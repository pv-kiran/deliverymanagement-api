const Driver = require("../../models/driver");
const { validateDriverUpdate } = require("../../utils/validation");

const viewProfile = async (req, res) => {
  try {
    const driverExist = await Driver.findOne(
      { _id: req.userId },
      { password: 0 }
    );
    if (driverExist) {
      return res.status(200).json({
        success: true,
        driverExist,
      });
    }
    res.status(404).json({
      success: false,
      message: "No driver found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  const { error } = validateDriverUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    if (updatedDriver) {
      updatedDriver.password = undefined; // to hide the password from response
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

const deleteProfile = async (req, res) => {
  try {
    const deleteDriver = await Driver.findByIdAndDelete(req.userId);
    if (deleteDriver) {
      return res.status(200).json({
        success: true,
        message: "Driver profile is deleted",
      });
    }
    return res.status(404).json({
      success: false,
      message: "Driver profile not found",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  viewProfile,
  updateProfile,
  deleteProfile,
};
