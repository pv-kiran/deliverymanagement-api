const uploadFile = (req, res, next) => {
  if (!req.files || !req.files.productImg) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file",
    });
  }

  const productImg = req.files.productImg;

  // only image files
  if (!productImg.mimetype.startsWith("image/")) {
    return res.status(400).json({
      success: false,
      message: "Only image files are allowed",
    });
  }

  // validations for extensions - jpeg or png only

  //   const allowedMimeTypes = ["image/jpeg", "image/png"];

  //   if (!allowedMimeTypes.includes(productImg.mimetype)) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Only JPEG and PNG files are allowed.",
  //     });
  //   }

  next();
};

module.exports = uploadFile;
