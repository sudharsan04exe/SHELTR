const User=require('../models/User')
const jwt =require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d';


exports.register =async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        const existinguser= await User.findOne({email});
        if(existinguser)return res.status(400).json({message:'email already registered'});

        const user =new User({name,email,password,role});
        await user.save();

        // generate token
       const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
}

exports.login = async (req,res)=>{
    try{
        const {email,password}=req.body;

         const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Logout controller (stateless JWT, just respond success)
exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Get profile controller
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

// Update profile controller
exports.updateProfile = async (req, res) => {
  try {
    // Prevent password update here; separate endpoint recommended if needed
    if (req.body.password) delete req.body.password;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
      select: '-password',
    });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};