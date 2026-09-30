const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRoles = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/members', ProfileController.listMembers);
router.get('/members/:username', ProfileController.getPublic);
router.get('/me', authMiddleware, ProfileController.getMe);
router.patch('/me', authMiddleware, requireRoles('member', 'superadmin'), ProfileController.updateMe);

module.exports = router;
