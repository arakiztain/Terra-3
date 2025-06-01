import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(userData) {
  const token = jwt.sign(
    { _id: userData._id, role: userData.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  return token;
}


function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
}
export {
    createToken,
    verifyToken
}