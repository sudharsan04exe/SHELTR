// middleware/authorize.js

const authorizeVendorOrAdmin = (req, res, next) => {
  if (req.user.role === 'vendor' || req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Vendor/admins only.' });
  }
};

module.exports = authorizeVendorOrAdmin;
