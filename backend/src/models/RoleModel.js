const db = require('../config/database');

const RoleModel = {
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, name FROM roles WHERE id = ?', [id]);
    return rows[0];
  },

  findByName: async (name) => {
    const [rows] = await db.query('SELECT id, name FROM roles WHERE name = ?', [name]);
    return rows[0];
  }
};

module.exports = RoleModel;
