/**
 * Router principal de la API.
 * Centraliza y monta todas las sub-rutas bajo /api.
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const imageRoutes = require('./imageRoutes');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRoles = require('../middlewares/roleMiddleware');
const profileRoutes = require('./profileRoutes');
const memberRoutes = require('./memberRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/auth', authRoutes);
router.use('/admin/media', imageRoutes);
router.use('/profiles', profileRoutes);
router.use('/admin/members', memberRoutes);
router.use('/projects', projectRoutes);

router.get('/admin/health', authMiddleware, requireRoles('superadmin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

module.exports = router;
