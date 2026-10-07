const ProjectMembersService = require('../services/projectMembersService');

const ProjectMembersController = {
  list: async (req, res, next) => { try { res.json(await ProjectMembersService.list(req.user)); } catch (error) { next(error); } },
  get: async (req, res, next) => { try { res.json(await ProjectMembersService.get(req.params.slug)); } catch (error) { next(error); } },
  pendingInvitation: async (req, res, next) => { try { res.json(await ProjectMembersService.pendingInvitation(req.user) );  } catch (error) { next(error); } },
  acceptInvitation: async (req, res, next) => { try { await ProjectMembersService.acceptInvitation(req.user, req.params.id); res.json({ message: 'Invitation accepted' }); } catch (error) { next(error); } }
};

module.exports = ProjectMembersController;