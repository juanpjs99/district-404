/**
 * Controlador de autenticación.
 * Maneja las rutas POST /register, POST /login y GET /me.
 */
const AuthService = require('../services/authService');

const AuthController = {
  register: async (req, res, next) => {
    try {
      const { person, user } = req.body;
      const result = await AuthService.register({ person, user });
      res.status(201).json({ message: 'User registered successfully', ...result });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { UserName, Password } = req.body;
      const result = await AuthService.login(UserName, Password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req, res, next) => {
    try {
      const result = await AuthService.getMe(req.user.userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = AuthController;
