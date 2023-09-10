const Driver = require("../../models/driver");
const { getSecurePassword, verifyPassword } = require("../../utils/password");
const { getToken } = require("../../utils/token");
const {
  signupValidation,
  signinValidation,
} = require("../../utils/validation");

const driverSignup = async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  // validation logic
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, mobile, password } = req.body;
  // checking for the existance of email
  const driverExist = await Driver.findOne({
    $or: [{ email: email }, { mobile, mobile }],
  });
  if (driverExist) {
    return res
      .status(409)
      .json({ success: false, message: "Email or Mobile already exists" });
  }

  // hashing the password
  const hashedPassword = await getSecurePassword(password);

  // creation of new candidate
  const newDriver = await Driver.create({
    ...req.body,
    password: hashedPassword,
  });

  newDriver.password = undefined;

  res.status(201).json({
    sucess: true,
    newDriver,
  });
};

const driverSignin = async (req, res) => {
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
  const driverExist = await Driver.findOne({ mobile: mobile });
  if (driverExist) {
    // checking the passowrd
    const isCorrectPassword = await verifyPassword(
      password,
      driverExist.password
    );
    // password is correct
    if (isCorrectPassword) {
      // token configuration
      const token = getToken(driverExist._id);

      driverExist.token = token;
      driverExist.password = undefined;

      // for cookie configuration
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        user: driverExist,
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
  driverSignup,
  driverSignin,
};
