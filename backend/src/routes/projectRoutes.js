const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRoles = require('../middlewares/roleMiddleware');
const ProjectController = require('../controllers/ProjectController');

const router = express.Router();
router.get('/', ProjectController.list);
router.get('/:slug', ProjectController.get);
router.post('/', authMiddleware, requireRoles('member', 'superadmin'), ProjectController.create);
router.patch('/:id', authMiddleware, requireRoles('member', 'superadmin'), ProjectController.update);
router.delete('/:id', authMiddleware, requireRoles('member', 'superadmin'), ProjectController.remove);
router.post('/:id/collaborators', authMiddleware, requireRoles('member', 'superadmin'), ProjectController.invite);
router.post('/collaborations/:id/accept', authMiddleware, requireRoles('member', 'superadmin'), ProjectController.acceptInvitation);

module.exports = router;
