/**
 * Rutas de autenticación.
 * POST /login - Inicio de sesión
 * GET /me - Obtener usuario autenticado (protegido)
 */
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { validateRegister, validateLogin } = require('../validator/authValidator');

router.post('/register', validate(validateRegister), AuthController.register);
router.post('/login', validate(validateLogin), AuthController.login);
router.get('/me', authMiddleware, AuthController.getMe);

module.exports = router;
