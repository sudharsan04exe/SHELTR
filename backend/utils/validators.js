const {body} = require('express-validator');
const User=require('../models/User');


const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Valid email is required')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  validateRegister,
  validateLogin,
};


