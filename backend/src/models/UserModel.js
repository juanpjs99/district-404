/**
 * Modelo para operaciones CRUD sobre la tabla Users en MySQL.
 * Gestiona credenciales de acceso (username + password hasheado).
 */
const db = require('../config/database');

const UserModel = {
  findById: async (id) => {
    const [rows] = await db.query(
      'SELECT u.*, r.name AS role_name FROM Users u JOIN roles r ON r.id = u.role_id WHERE u.ID = ?',
      [id]
    );
    return rows[0];
  },

  findByUsername: async (username) => {
    const [rows] = await db.query(
      'SELECT u.*, r.name AS role_name FROM Users u JOIN roles r ON r.id = u.role_id WHERE u.UserName = ?',
      [username]
    );
    return rows[0];
  },

  findByPersonId: async (personId) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE personID = ?', [personId]);
    return rows[0];
  },

  findAll: async () => {
    const [rows] = await db.query(
      `SELECT u.ID, u.UserName, u.status, r.id AS role_id, r.name AS role_name,
        pe.firstName, pe.firstSurname, pe.email
       FROM Users u
       JOIN roles r ON r.id = u.role_id
       JOIN Person pe ON pe.ID = u.personID
       ORDER BY pe.firstName, pe.firstSurname`
    );
    return rows;
  },

  updateRole: async (id, roleId) => {
    await db.query('UPDATE Users SET role_id = ? WHERE ID = ?', [roleId, id]);
  },

  updateStatus: async (id, status) => {
    await db.query('UPDATE Users SET status = ? WHERE ID = ?', [status, id]);
  },

  create: async (userData, executor = db) => {
    const { personID, UserName, Password, role_id } = userData;
    const [result] = await executor.query(
      'INSERT INTO Users (personID, UserName, Password, role_id) VALUES (?, ?, ?, ?)',
      [personID, UserName, Password, role_id]
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
