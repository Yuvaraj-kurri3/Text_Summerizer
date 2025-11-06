import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function loginornot(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    const token = (authHeader && authHeader.split(' ')[1]) || (req.cookies && req.cookies.token) ;
     if (!token) {
      return res.status(401).json({ message: 'No token provided. Please log in first.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
       req.user = user;
      next();
    });
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ message: 'Authentication error' });
  }
}

export default loginornot;