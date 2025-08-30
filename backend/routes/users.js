const express=require('express');
const router=express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // JWT auth middleware
const { validateRequest } = require('../middleware/validation');
const { validateProfileUpdate } = require('../utils/validators');

router.use(auth);

router.get('/:id', userController.getUserById);

// Route to update a user by ID
router.put('/:id', validateProfileUpdate, validateRequest, userController.updateUserById);

module.exports= router;
