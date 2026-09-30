const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRoles = require('../middlewares/roleMiddleware');
const MemberController = require('../controllers/MemberController');

const router = express.Router();

router.use(authMiddleware, requireRoles('superadmin'));
router.get('/', MemberController.list);
router.patch('/:id/role', MemberController.updateRole);
router.patch('/:id/status', MemberController.updateStatus);

module.exports = router;
