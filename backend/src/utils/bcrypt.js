/**
 * Utilidades para manejo seguro de contraseñas usando bcrypt.
 * Proporciona funciones para hashear contraseñas antes de almacenarlas
 * y comparar contraseñas en texto plano contra hashes almacenados.
 */
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword
};
