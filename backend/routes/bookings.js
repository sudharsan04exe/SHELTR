const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const { validateBooking } = require('../utils/validators');
const { validateRequest } = require('../middleware/validation');

// All routes require authenticated users
router.use(auth);

// Create a new booking
router.post('/', validateBooking, validateRequest, bookingController.createBooking);

// Get all bookings for logged-in user (guest)
router.get('/my-bookings', bookingController.getMyBookings);

// Get booking by ID (only accessible to guest or vendor involved)
router.get('/:id', bookingController.getBookingById);

// Update booking status (e.g., cancel booking) – optionally restrict to vendor or guest
router.put('/:id', bookingController.updateBookingStatus);

// Delete a booking (optional, admin or guest can cancel)
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
