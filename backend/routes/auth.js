const express=require("express")
const router=express.Router();

const { validateRegister,validateLogin,validateProfileUpdate}=require ('../utils/validators')
const {validateRequest}=require ('../middleware/validation')
const authController = require('../controllers/authController');
const auth=require('../middleware/auth')


// considering the body is validated on middleware
router.post("/register",validateRegister,validateRequest,authController.register)

router.post('/login', validateLogin, validateRequest, authController.login);

router.post('/logout', auth, authController.logout);

router.get('/profile', auth, authController.getProfile);

router.put('/profile', auth, validateProfileUpdate, validateRequest, authController.updateProfile);
    

module.exports =router;