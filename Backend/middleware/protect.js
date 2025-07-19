import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Use `decoded.id` instead of `decoded.userId`
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({
        error: 'Not authorized, token invalid or expired',
        details: error.message
      });
    }
  } else {
    return res.status(401).json({
      error: 'Not authorized, No token found'
    });
  }
};
