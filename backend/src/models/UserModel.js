/**
 * Modelo para operaciones CRUD sobre la tabla Users en MySQL.
 * Gestiona credenciales de acceso (username + password hasheado).
 */
const db = require('../config/database');

const UserModel = {
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE ID = ?', [id]);
    return rows[0];
  },

  findByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE UserName = ?', [username]);
    return rows[0];
  },

  findByPersonId: async (personId) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE personID = ?', [personId]);
    return rows[0];
  },

  create: async (userData) => {
    const { personID, UserName, Password } = userData;
    const [result] = await db.query(
      'INSERT INTO Users (personID, UserName, Password) VALUES (?, ?, ?)',
      [personID, UserName, Password]
    );
    return result.insertId;
  },

  updatePassword: async (id, hashedPassword) => {
    await db.query('UPDATE Users SET Password = ? WHERE ID = ?', [hashedPassword, id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM Users WHERE ID = ?', [id]);
  }
};

module.exports = UserModel;
