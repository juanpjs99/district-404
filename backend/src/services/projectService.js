const ProjectModel = require('../models/ProjectModel');
const ProjectMembersModel = require('../models/ProjectMembersModel');

const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const assertProjectAccess = (project, user) => {
  if (!project) throw Object.assign(new Error('Project not found'), { statusCode: 404 });
  if (user.role !== 'superadmin' && project.owner_id !== user.userId) {
    throw Object.assign(new Error('Insufficient permissions'), { statusCode: 403 });
  }
};

const ProjectService = {
  list: () => ProjectModel.findAll(),
  get: async (slug) => {
    const project = await ProjectModel.findBySlug(slug);
    if (!project) throw Object.assign(new Error('Project not found'), { statusCode: 404 });
    project.ProjectMembersModel = await ProjectMembersModel.listByProject(project.id);
    return project;
  },
  create: async (user, data) => {
    const id = await ProjectModel.create({ ...data, ownerId: user.userId, slug: `${slugify(data.title)}-${Date.now()}` });
    return ProjectModel.findById(id);
  },
  update: async (user, id, data) => {
    const project = await ProjectModel.findById(id);
    assertProjectAccess(project, user);
    await ProjectModel.update(id, data);
    return ProjectModel.findById(id);
  },
  remove: async (user, id) => {
    const project = await ProjectModel.findById(id);
    assertProjectAccess(project, user);
    await ProjectModel.delete(id);
  },
  invite: async (user, id, data) => {
    const project = await ProjectModel.findById(id);
    assertProjectAccess(project, user);
    return ProjectMembersModel.invite(id, data.userId, data.role, data.contribution);
  },
  /*acceptInvitation: async (user, id) => {
    const accepted = await ProjectMembersModel.accept(id, user.userId);
    if (!accepted) throw Object.assign(new Error('Invitation not found'), { statusCode: 404 });
  }*/
};

module.exports = ProjectService;
