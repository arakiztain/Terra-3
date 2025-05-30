import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Token de sesión (para usuarios autenticados)
function createToken(userData) {
  const token = jwt.sign(
    { _id: userData._id, role: userData.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  return token;
}

// Token de activación (solo email)
function createActivationToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
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
  createActivationToken,
  verifyToken
};
