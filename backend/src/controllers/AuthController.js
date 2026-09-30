/**
 * Controlador de autenticación.
 * Maneja las rutas POST /login y GET /me.
 */
const AuthService = require('../services/authService');

const AuthController = {
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
