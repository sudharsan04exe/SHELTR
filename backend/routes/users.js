// this is users.js
const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // JWT auth middleware
const { validateRequest } = require('../middleware/validation');
const { validateProfileUpdate } = require('../utils/validators');

router.use(auth);
function isValidObjectId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ message: 'Invalid user ID format' });
}
next();

}

router.get('/:id',isValidObjectId, userController.getUserById);

// Route to update a user by ID
router.put('/:id', validateProfileUpdate, validateRequest, userController.updateUserById);

module.exports= router;
