/**
 * Modelo para operaciones CRUD sobre la tabla Profiles en MySQL.
 * Gestiona perfiles públicos (bio, skills, github, linkedin).
 */
const db = require('../config/database');

const ProfileModel = {
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Profiles WHERE ID = ?', [id]);
    return rows[0];
  },

  findByUserId: async (userId) => {
    const [rows] = await db.query('SELECT * FROM Profiles WHERE userID = ?', [userId]);
    return rows[0];
  },

  findPublicByUsername: async (username) => {
    const [rows] = await db.query(
      `SELECT u.ID AS userId, u.UserName AS username, p.ID AS profileId,
        p.biography, p.profession, p.skills, p.githubUrl, p.linkedinUrl,
        p.avatarUrl, p.location, pe.firstName, pe.firstSurname
       FROM Users u
       JOIN roles r ON r.id = u.role_id AND r.name = 'member'
       JOIN Person pe ON pe.ID = u.personID
       JOIN Profiles p ON p.userID = u.ID
       WHERE u.UserName = ? AND u.status = 'active'`,
      [username]
    );
    return rows[0];
  },

  findAllMembers: async () => {
    const [rows] = await db.query(
      `SELECT u.ID AS userId, u.UserName AS username, p.ID AS profileId,
        p.biography, p.profession, p.skills, p.avatarUrl, p.location,
        pe.firstName, pe.firstSurname
       FROM Users u
       JOIN roles r ON r.id = u.role_id AND r.name = 'member'
       JOIN Person pe ON pe.ID = u.personID
       JOIN Profiles p ON p.userID = u.ID
       WHERE u.status = 'active'
       ORDER BY pe.firstName, pe.firstSurname`
    );
    return rows;
  },

  create: async (profileData, executor = db) => {
    const { userID, biography, profession, skills, githubUrl, linkedinUrl, avatarUrl, location } = profileData;
    const [result] = await executor.query(
      'INSERT INTO Profiles (userID, biography, profession, skills, githubUrl, linkedinUrl, avatarUrl, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userID, biography, profession, skills, githubUrl, linkedinUrl, avatarUrl, location]
    );
    return result.insertId;
  },

  update: async (id, profileData, executor = db) => {
    const { biography, profession, skills, githubUrl, linkedinUrl, avatarUrl, location } = profileData;
    await executor.query(
      'UPDATE Profiles SET biography = ?, profession = ?, skills = ?, githubUrl = ?, linkedinUrl = ?, avatarUrl = ?, location = ? WHERE ID = ?',
      [biography, profession, skills, githubUrl, linkedinUrl, avatarUrl, location, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM Profiles WHERE ID = ?', [id]);
  }
};

module.exports = ProfileModel;
