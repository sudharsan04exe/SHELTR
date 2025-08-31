const express=require("express");
const listingController = require('../controllers/listingController');
const auth = require('../middleware/auth');
const { validateListing } = require('../utils/validators');
const { validateRequest } = require('../middleware/validation');
const upload = require('../middleware/upload');
const authorizeVendorOrAdmin=require("../middleware/authorize")

const router=express.Router();




// vendor accessible
router.post('/',auth,authorizeVendorOrAdmin,upload.array('images'),validateListing,validateRequest,listingController.createListing)
// public accessible
router.get('/', listingController.getAllListings);

// Get a single listing by ID (public)
router.get('/:id', listingController.getListingById);

// Update a listing (Vendor only, can upload new images)
router.put(
  '/:id',auth,authorizeVendorOrAdmin,upload.array('images'),validateListing,validateRequest, listingController.updateListing);

// Delete a listing (Vendor only)
router.delete(
  '/:id',
  auth,
  authorizeVendorOrAdmin,                  // Require authentication
  listingController.deleteListing
);

module.exports = router;