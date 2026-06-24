/**
 * Configuración centralizada de variables de entorno.
 * Carga y valida las variables del archivo .env (DATABASE_URL, JWT_SECRET, etc.)
 * asegurando que las críticas estén presentes antes de iniciar la aplicación.
 */
const dotenv = require('dotenv');

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

const validateEnv = () => {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env file');
  }
};

module.exports = {
  env,
  validateEnv
};
