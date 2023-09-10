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

// validation for category data - (admin operation create/update vendor)
const categoryValidate = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
});

// validation for product data - (admin operation create product)
const validateProductCreation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  price: Joi.number().required().messages({
    "any.required": "Price is required",
  }),
  // image: Joi.object({
  //   public_id: Joi.string(),
  //   secure_url: Joi.string(),
  // }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
  category: Joi.string().hex().length(24).required().messages({
    "any.required": "Category is required",
    "string.hex": "Category must be a valid ObjectId",
    "string.length": "Category must be a 24-character hexadecimal string",
  }),
  stock: Joi.number().required().messages({
    "any.required": "Stock is required",
  }),
});

// validation for product data - (admin operation update product)
const validateProductUpdate = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be a string",
  }),
  price: Joi.number().messages({
    "number.base": "Price must be a number",
  }),
  // image: Joi.object({
  //   public_id: Joi.string().messages({
  //     "string.base": "Image public_id must be a string",
  //   }),
  //   secure_url: Joi.string().messages({
  //     "string.base": "Image secure_url must be a string",
  //   }),
  // }),
  description: Joi.string().messages({
    "string.base": "Description must be a string",
  }),
  category: Joi.string().hex().length(24).messages({
    "string.base": "Category must be a hexadecimal string",
    "string.length": "Category must be a 24-character hexadecimal string",
  }),
  stock: Joi.number().messages({
    "number.base": "Stock must be a number",
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  validateVendorCreation,
  validateVendorUpdate,
  categoryValidate,
  validateProductCreation,
  validateProductUpdate,
};
