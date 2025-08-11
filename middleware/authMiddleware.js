/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import Patientaccount from '../models/patientaccount.js';
import Staffaccount from '../models/staffacount.js';
import Owneraccount from '../models/owneraccount.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user based on role
    let user;
    switch (decoded.role) {
      case 'patient':
        user = await Patientaccount.findById(decoded.id).select('-patientpassword');
        break;
      case 'staff':
        user = await Staffaccount.findById(decoded.id).select('-staffpassword');
        break;
      case 'owner':
        user = await Owneraccount.findById(decoded.id).select('-ownerpassword');
        break;
      default:
        return res.status(401).json({ message: 'Invalid user role' });
    }
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Attach user to request object
    req.user = {
      userId: user._id,
      role: decoded.role,
      name: user.patientfirstname || user.stafffirstname || user.ownerfirstname,
      clinic: user.staffclinic || user.ownerclinic || null
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};