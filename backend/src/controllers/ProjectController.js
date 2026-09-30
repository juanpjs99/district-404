const ProjectService = require('../services/projectService');

const ProjectController = {
  list: async (req, res, next) => { try { res.json(await ProjectService.list()); } catch (error) { next(error); } },
  get: async (req, res, next) => { try { res.json(await ProjectService.get(req.params.slug)); } catch (error) { next(error); } },
  create: async (req, res, next) => { try { res.status(201).json(await ProjectService.create(req.user, req.body)); } catch (error) { next(error); } },
  update: async (req, res, next) => { try { res.json(await ProjectService.update(req.user, req.params.id, req.body)); } catch (error) { next(error); } },
  remove: async (req, res, next) => { try { await ProjectService.remove(req.user, req.params.id); res.status(204).send(); } catch (error) { next(error); } },
  invite: async (req, res, next) => { try { const id = await ProjectService.invite(req.user, req.params.id, req.body); res.status(201).json({ id, status: 'pending' }); } catch (error) { next(error); } },
  acceptInvitation: async (req, res, next) => { try { await ProjectService.acceptInvitation(req.user, req.params.id); res.json({ message: 'Invitation accepted' }); } catch (error) { next(error); } }
};

module.exports = ProjectController;
