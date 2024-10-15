import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Get token from headers

    if (!token) {
      return res.status(401).json({ msg: 'Token missing, please log in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify token

    if (!decoded) {
      return res.status(401).json({ msg: 'Invalid token, please log in' });
    }

    // Find the user and attach the user info to the request object
    const user = await UserModel.findOne({ _id: decoded.id }).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ msg: 'Authentication failed, please log in' });
  }
};

export default verifyUser;
