const ProfileService = require('../services/profileService');

const ProfileController = {
  getMe: async (req, res, next) => {
    try { res.json(await ProfileService.getMe(req.user.userId)); } catch (error) { next(error); }
  },
  updateMe: async (req, res, next) => {
    try { res.json(await ProfileService.updateMe(req.user.userId, req.body)); } catch (error) { next(error); }
  },
  listMembers: async (req, res, next) => {
    try { res.json(await ProfileService.listMembers()); } catch (error) { next(error); }
  },
  getPublic: async (req, res, next) => {
    try { res.json(await ProfileService.getPublic(req.params.username)); } catch (error) { next(error); }
  }
};

module.exports = ProfileController;
