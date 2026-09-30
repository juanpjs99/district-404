const db = require('../config/database');
const PersonModel = require('../models/PersonModel');
const ProfileModel = require('../models/ProfileModel');
const UserModel = require('../models/UserModel');

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) return JSON.stringify(skills);
  if (typeof skills === 'string') return JSON.stringify(skills.split(',').map((skill) => skill.trim()).filter(Boolean));
  return JSON.stringify([]);
};

const ProfileService = {
  getMe: async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
    const person = await PersonModel.findById(user.personID);
    const profile = await ProfileModel.findByUserId(userId);
    return { userId, username: user.UserName, role: user.role_name, person, profile };
  },

  updateMe: async (userId, data) => {
    const user = await UserModel.findById(userId);
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      await PersonModel.update(user.personID, {
        firstName: data.firstName,
        firstSurname: data.firstSurname,
        email: data.email
      }, connection);
      await ProfileModel.update(userId ? (await ProfileModel.findByUserId(userId)).ID : null, {
        biography: data.biography || null,
        profession: data.profession || null,
        skills: normalizeSkills(data.skills),
        githubUrl: data.githubUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        avatarUrl: data.avatarUrl || null,
        location: data.location || null
      }, connection);
      await connection.commit();
      return ProfileService.getMe(userId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  listMembers: () => ProfileModel.findAllMembers(),
  getPublic: async (username) => {
    const profile = await ProfileModel.findPublicByUsername(username);
    if (!profile) throw Object.assign(new Error('Member not found'), { statusCode: 404 });
    return profile;
  }
};

module.exports = ProfileService;
