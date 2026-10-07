const ProjectModel = require('../models/ProjectModel');
const ProjectMembersModel = require('../models/ProjectMembersModel');

const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const assertProjectAccess = (project, user) => {
  if (!project) throw Object.assign(new Error('Project not found'), { statusCode: 404 });
  if (user.role !== 'superadmin' && project.owner_id !== user.userId) {
    throw Object.assign(new Error('Insufficient permissions'), { statusCode: 403 });
  }
};

const ProjectMembersService = {

  list: (user) => ProjectMembersModel.listByProject(user.userId),
  get: async (slug) => {
    const project = await ProjectModel.findBySlug(slug);
    if (!project) throw Object.assign(new Error('Project not found'), { statusCode: 404 });
    project.ProjectMembersModels = await ProjectMembersModel.listByProject(project.id);
    return project;
  },
  pendingInvitation: async (user) => {
    const pending = await ProjectMembersModel.findPending(user.userId);

    if (!pending) throw Object.assign(new Error('Invitation not found'), { statusCode: 404 });
    return pending;
  },
  acceptInvitation: async (user, id) => {
    const accepted = await ProjectMembersModel.accept(id, user.userId);
    if (!accepted) throw Object.assign(new Error('Invitation not found'), { statusCode: 404 });
    return accepted;
  }
};

module.exports = ProjectMembersService;
