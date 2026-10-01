/**
 * Configuración centralizada de variables de entorno.
 * Carga y valida las variables del archivo .env.
 * asegurando que las críticas estén presentes antes de iniciar la aplicación.
 */
const dotenv = require('dotenv');

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_PORT: Number(process.env.MYSQL_PORT || 3306),
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DB: process.env.MYSQL_DB,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

const validateEnv = () => {
  const missing = ['MYSQL_USER', 'MYSQL_DB', 'JWT_SECRET']
    .filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  if (!Number.isInteger(env.MYSQL_PORT) || env.MYSQL_PORT < 1 || env.MYSQL_PORT > 65535) {
    throw new Error('MYSQL_PORT must be a valid port number');
  }
};

module.exports = {
  env,
  validateEnv
};
