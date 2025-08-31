const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  vendor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  pricePerNight: { 
    type: Number, 
    required: true 
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true }
  },
  images: [
    { type: String }                 // Array of image file paths or URLs
  ],
  amenities: [
    { type: String }                 // Array of amenities (strings)
  ],
  availability: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Listing', listingSchema);
