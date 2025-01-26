// Routes/protectedRoute.js
import express from 'express';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router();

// Protected route
router.get('/profile', verifyToken, (req, res) => {
  res.json({ success: true, message: 'You are authorized', userId: req.userId });
});

export default router;
