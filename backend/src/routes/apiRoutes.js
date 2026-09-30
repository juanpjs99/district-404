/**
 * Router principal de la API.
 * Centraliza y monta todas las sub-rutas bajo /api.
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const imageRoutes = require('./imageRoutes');

router.use('/auth', authRoutes);
router.use('/admin/media', imageRoutes);

module.exports = router;
