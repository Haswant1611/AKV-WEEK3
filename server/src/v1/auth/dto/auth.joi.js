const Joi = require('joi');

// Signup validation schema
const signupSchema = Joi.object({
  firstname: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 1 character long',
    'string.max': 'First name must be less than or equal to 50 characters long',
  }),
  lastname: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 1 character long',
    'string.max': 'Last name must be less than or equal to 50 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
  }),
  role: Joi.number().valid(1, 2, 3).required().messages({
    'any.only': 'Role must be either 1 (Admin), 2 (Manager), or 3 (User)',
    'number.base': 'Role ID must be a number',
    'any.required': 'Role is required',
  }),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
  }),
});

module.exports = { signupSchema, loginSchema };