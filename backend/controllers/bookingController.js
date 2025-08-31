const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { listing: listingId, checkIn, checkOut, totalPrice } = req.body;

    // Validate listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    // Prevent booking on unavailable listing
    if (!listing.availability) {
      return res.status(400).json({ message: 'Listing is not available for booking' });
    }

    // Create booking document with guest as the logged-in user and vendor from listing
    const booking = new Booking({
      listing: listingId,
      guest: req.user.id,
      vendor: listing.vendor,
      checkIn,
      checkOut,
      totalPrice,
      status: 'pending',
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error creating booking' });
  }
};

// Get all bookings for the logged-in user (guest)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user.id })
      .populate('listing', 'title pricePerNight')
      .populate('vendor', 'name email');
    res.json(bookings);
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};

// Get booking by ID - only accessible by guest or vendor
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('listing')
      .populate('guest', 'name email')
      .populate('vendor', 'name email');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Check access: only guest or vendor can see booking
    if (booking.guest._id.toString() !== req.user.id && booking.vendor._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({ message: 'Server error fetching booking' });
  }
};

// Update booking status (e.g., cancel)
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only guest or vendor can update status
    if (booking.guest.toString() !== req.user.id && booking.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error updating booking' });
  }
};

// Delete booking (optional)
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only guest can delete/cancel; optionally restrict per business logic
    if (booking.guest.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    await booking.remove();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ message: 'Server error deleting booking' });
  }
};
