const db = require('../config/database');

const CollaborationModel = {
  listByProject: async (projectId) => {
    const [rows] = await db.query(
      `SELECT pm.*, u.UserName AS username, pe.firstName, pe.firstSurname
       FROM ProjectMembers pm
       JOIN Users u ON u.ID = pm.user_id
       JOIN Person pe ON pe.ID = u.personID
       WHERE pm.project_id = ? AND pm.status = 'accepted'`,
      [projectId]
    );
    return rows;
  },

  invite: async (projectId, userId, role, contribution) => {
    const [result] = await db.query(
      `INSERT INTO ProjectMembers (project_id, user_id, role, contribution, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [projectId, userId, role || null, contribution || null]
    );
    return result.insertId;
  },

  findPending: async (projectId, userId) => {
    const [rows] = await db.query(
      "SELECT * FROM ProjectMembers WHERE project_id = ? AND user_id = ? AND status = 'pending'",
      [projectId, userId]
    );
    return rows[0];
  },

  accept: async (id, userId) => {
    const [result] = await db.query(
      "UPDATE ProjectMembers SET status = 'accepted' WHERE id = ? AND user_id = ? AND status = 'pending'",
      [id, userId]
    );
    return result.affectedRows > 0;
  }
};

module.exports = CollaborationModel;
