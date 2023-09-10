const Admin = require("../../models/admin");
const { getSecurePassword, verifyPassword } = require("../../utils/password");
const { getToken } = require("../../utils/token");
const {
  signupValidation,
  signinValidation,
} = require("../../utils/validation");

const adminSignup = async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  // validation logic
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password, mobile } = req.body;
  // checking for the existance of email
  const adminExist = await Admin.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (adminExist) {
    return res
      .status(409)
      .json({ success: false, message: "Email or mobile is already in use" });
  }

  // hashing the password
  const hashedPassword = await getSecurePassword(password);

  // creation of new candidate
  const newAdmin = await Admin.create({
    ...req.body,
    password: hashedPassword,
  });

  newAdmin.password = undefined;

  res.status(201).json({
    sucess: true,
    newAdmin,
  });
};

const adminSignin = async (req, res) => {
  // validation check
  const { error } = signinValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { mobile, password } = req.body;

  // checking the existance of the user
  const adminExist = await Admin.findOne({ mobile: mobile });
  if (adminExist) {
    // checking the passowrd
    const isCorrectPassword = await verifyPassword(
      password,
      adminExist.password
    );
    // password is correct
    if (isCorrectPassword) {
      // token configuration
      const token = getToken(adminExist._id);

      adminExist.token = token;
      adminExist.password = undefined;

      // for cookie configuration
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        user: adminExist,
      });
    }
    // incorrect password
    return res.status(400).json({
      success: false,
      message: "Password is incorrect",
    });
  }
  return res.status(404).json({
    success: false,
    message: `User doesn't exist`,
  });
};

module.exports = {
  adminSignup,
  adminSignin,
};
