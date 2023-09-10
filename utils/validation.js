const Joi = require("joi");

// valiadation for signup
const signupValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must be a 10-digit number",
    }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

// validation for signin
const signinValidation = Joi.object({
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must be a 10-digit number",
    }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
};
