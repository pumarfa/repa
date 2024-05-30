import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Function to generate a JWT
export function generateToken(user) {
  return jwt.sign({ id: user.id, name: user.name, roles: user.roles }, JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
}

// Middleware to verify JWT
export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
}

