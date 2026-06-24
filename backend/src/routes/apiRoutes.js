/**
 * Router principal de la API.
 * Centraliza y monta todas las sub-rutas bajo /api.
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');

router.use('/auth', authRoutes);

module.exports = router;
