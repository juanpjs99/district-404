/**
 * Utilidades para generación y verificación de tokens JWT (JSON Web Tokens).
 * Se utiliza para autenticación: genera tokens al hacer login y verifica
 * tokens en requests protegidos por middleware de autenticación.
 */
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

const JWT_EXPIRES_IN = '7d';

const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
