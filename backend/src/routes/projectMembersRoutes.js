const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRoles = require('../middlewares/roleMiddleware');
const ProjectMembersController = require('../controllers/ProjectMembersController');

const router = express.Router();
router.get('/pendingInvitation',authMiddleware, ProjectMembersController.pendingInvitation);
router.get('/', authMiddleware, ProjectMembersController.list);
router.post('/acceptedIvitation/:id', authMiddleware, requireRoles('member', 'superadmin'), ProjectMembersController.acceptInvitation);

module.exports = router;
