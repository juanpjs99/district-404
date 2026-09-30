/**
 * Configuración principal de Express.
 * Monta middlewares globales (CORS, JSON parser), rutas API y middleware de errores.
 */
const express = require('express');
const cors = require('cors');
const { env, validateEnv } = require('./config/env');
const apiRoutes = require('./routes/apiRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

validateEnv();

const app = express();

app.use(cors({ origin: env.FRONTEND_ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

app.use('/api', apiRoutes);

app.use(errorMiddleware);

module.exports = app;
