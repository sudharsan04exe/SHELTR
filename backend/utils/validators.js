// validators.js
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

const validateProfileUpdate = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  // Add other profile fields validations as needed
];

const validateListing = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title can be max 100 characters'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description can be max 1000 characters'),

  body('pricePerNight')
    .notEmpty().withMessage('Price per night is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

  body('address')
    .notEmpty().withMessage('Address is required'),

  body('city')
    .notEmpty().withMessage('City is required'),

  body('state')
    .optional()
    .isLength({ max: 50 }).withMessage('State can be max 50 characters'),

  body('country')
    .optional()
    .isLength({ max: 50 }).withMessage('Country can be max 50 characters'),

  body('zipCode')
    .optional()
    .isPostalCode('any').withMessage('Invalid zip/postal code'),

  body('amenities')
    .optional()
    .isArray().withMessage('Amenities must be an array'),

  body('amenities.*')
    .optional()
    .isString().withMessage('Each amenity must be a string'),

  body('availability')
    .optional()
    .isBoolean().withMessage('Availability must be a boolean'),
];
const validateBooking = [
  body('listing')
    .notEmpty().withMessage('Listing ID is required')
    .isMongoId().withMessage('Listing ID must be a valid MongoDB ObjectId'),

  body('checkIn')
    .notEmpty().withMessage('Check-in date is required')
    .isISO8601().withMessage('Check-in must be a valid date'),

  body('checkOut')
    .notEmpty().withMessage('Check-out date is required')
    .isISO8601().withMessage('Check-out must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkIn)) {
        throw new Error('Check-out date must be after check-in date');
      }
      return true;
    }),

  body('totalPrice')
    .notEmpty().withMessage('Total price is required')
    .isFloat({ gt: 0 }).withMessage('Total price must be a positive number'),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validateListing,
  validateBooking
};


