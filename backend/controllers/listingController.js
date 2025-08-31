
const Listing=require('../models/Listings')

exports.createListing = async (req, res) => {
  try {
    // Gather image file paths from multer uploads
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    const listing = new Listing({
      vendor: req.user.id,           // Vendor is authenticated user
      title: req.body.title,
      description: req.body.description,
      pricePerNight: req.body.pricePerNight,
      location: {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode,
      },
      images: imagePaths,
      amenities: req.body.amenities, // Should be array from frontend
      availability: req.body.availability !== undefined ? req.body.availability : true,
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error creating listing' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('vendor', 'name email');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    console.error('Get listing by ID error:', error);
    res.status(500).json({ message: 'Server error fetching listing' });
  }
};

// Update a listing
exports.updateListing = async (req, res) => {
  try {
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Only vendor who created the listing can update
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    // Update fields; if new images uploaded, append to images array
    if (imagePaths.length) {
      listing.images = [...listing.images, ...imagePaths];
    }
    if (req.body.title) listing.title = req.body.title;
    if (req.body.description) listing.description = req.body.description;
    if (req.body.pricePerNight) listing.pricePerNight = req.body.pricePerNight;
    if (req.body.address) listing.location.address = req.body.address;
    if (req.body.city) listing.location.city = req.body.city;
    if (req.body.state) listing.location.state = req.body.state;
    if (req.body.country) listing.location.country = req.body.country;
    if (req.body.zipCode) listing.location.zipCode = req.body.zipCode;
    if (req.body.amenities) listing.amenities = req.body.amenities;
    if (req.body.availability !== undefined) listing.availability = req.body.availability;

    await listing.save();
    res.json(listing);
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error updating listing' });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }
    await listing.remove();
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Server error deleting listing' });
  }
};

// Get all listings
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('vendor', 'name email');
    res.json(listings);
  } catch (error) {
    console.error('Get all listings error:', error);
    res.status(500).json({ message: 'Server error fetching listings' });
  }
};
