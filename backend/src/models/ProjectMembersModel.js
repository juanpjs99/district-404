const db = require('../config/database');

const ProjectMembersModel = {
  listByProject: async (userId) => {
    const [rows] = await db.query(
      `SELECT 
        pm.id AS collaborationId,
        pm.role,
        pm.contribution,
        pm.status,
        pm.created_at AS joinedDate,
        p.id AS projectId,
        p.title AS projectTitle,
        p.slug AS projectSlug,
        p.description AS projectDescription,
        p.cover_url AS projectCover,
        u.UserName AS ownerUsername,
        CONCAT(pe.firstName, ' ', pe.firstSurname) AS ownerName
       FROM ProjectMembers pm
       JOIN Projects p ON pm.project_id = p.id
       JOIN Users u ON p.owner_id = u.ID
       JOIN Person pe ON u.personID = pe.ID
       WHERE pm.user_id = ? AND pm.status = 'accepted'
       ORDER BY pm.created_at DESC`,
      [userId]
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

  findPending: async (userId) => {
    const [rows] = await db.query(
      "SELECT * FROM ProjectMembers WHERE user_id = ? AND status = 'pending'",
      [userId]
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

module.exports = ProjectMembersModel;
