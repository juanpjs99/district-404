/**
 * Router principal de la API.
 * Centraliza y monta todas las sub-rutas bajo /api.
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRoles = require('../middlewares/roleMiddleware');
const profileRoutes = require('./profileRoutes');
const memberRoutes = require('./memberRoutes');
const projectRoutes = require('./projectRoutes');
const projectMembersRoutes = require('./projectMembersRoutes');

router.use('/auth', authRoutes);
router.use('/profiles', profileRoutes);
router.use('/admin/members', memberRoutes);
router.use('/projects', projectRoutes);
router.use('/projectsMembers', projectMembersRoutes);

router.get('/admin/health', authMiddleware, requireRoles('superadmin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

module.exports = router;
