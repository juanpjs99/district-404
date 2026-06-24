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

  create: async (profileData) => {
    const { userID, biography, profession, skills, githubUrl, linkedinUrl } = profileData;
    const [result] = await db.query(
      'INSERT INTO Profiles (userID, biography, profession, skills, githubUrl, linkedinUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [userID, biography, profession, skills, githubUrl, linkedinUrl]
    );
    return result.insertId;
  },

  update: async (id, profileData) => {
    const { biography, profession, skills, githubUrl, linkedinUrl } = profileData;
    await db.query(
      'UPDATE Profiles SET biography = ?, profession = ?, skills = ?, githubUrl = ?, linkedinUrl = ? WHERE ID = ?',
      [biography, profession, skills, githubUrl, linkedinUrl, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM Profiles WHERE ID = ?', [id]);
  }
};

module.exports = ProfileModel;
