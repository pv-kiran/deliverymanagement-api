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

// validation for vendor data - (admin operation create vendor)
const validateVendorCreation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must be a 10-digit number",
    }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  shopName: Joi.string().required().messages({
    "any.required": "Shop name is required",
  }),
  address: Joi.object({
    street: Joi.string().required().messages({
      "any.required": "Street is required",
    }),
    city: Joi.string().required().messages({
      "any.required": "City is required",
    }),
    state: Joi.string().required().messages({
      "any.required": "State is required",
    }),
    pinCode: Joi.string().required().messages({
      "any.required": "Pin code is required",
    }),
  })
    .required()
    .messages({
      "any.required": "Address is required",
    }),
});

// validation for vendor data - (admin operation update vendor)
const validateVendorUpdate = Joi.object({
  name: Joi.string(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message(
      "Invalid mobile provided. Please provide a valid 10-digit mobile number."
    ),
  email: Joi.string()
    .email()
    .message("Invalid email provided. Please provide a valid email address."),
  shopDetails: Joi.string(),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    pinCode: Joi.string(),
  }),
});

const categoryValidate = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  validateVendorCreation,
  validateVendorUpdate,
  categoryValidate,
};
