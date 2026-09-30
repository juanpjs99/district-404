const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');

const MemberController = {
  list: async (req, res, next) => {
    try { res.json(await UserModel.findAll()); } catch (error) { next(error); }
  },

  updateRole: async (req, res, next) => {
    try {
      const roleId = Number(req.body.roleId);
      const role = await RoleModel.findById(roleId);
      if (!role) return res.status(400).json({ message: 'Role not found' });
      await UserModel.updateRole(req.params.id, roleId);
      res.json({ message: 'Role updated', role });
    } catch (error) { next(error); }
  },

  updateStatus: async (req, res, next) => {
    try {
      const allowed = ['active', 'inactive', 'blocked'];
      if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status' });
      await UserModel.updateStatus(req.params.id, req.body.status);
      res.json({ message: 'Status updated', status: req.body.status });
    } catch (error) { next(error); }
  }
};

module.exports = MemberController;
