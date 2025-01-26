// Middleware/verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.userId = decoded.userId;  // Save userId from token to request object
    next();  // Allow the request to proceed to the route handler
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};
