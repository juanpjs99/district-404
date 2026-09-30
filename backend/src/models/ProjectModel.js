const db = require('../config/database');

const ProjectModel = {
  findAll: async () => {
    const [rows] = await db.query(
      `SELECT p.*, u.UserName AS ownerUsername,
        CONCAT(pe.firstName, ' ', pe.firstSurname) AS ownerName
       FROM Projects p
       JOIN Users u ON u.ID = p.owner_id
       JOIN Person pe ON pe.ID = u.personID
       WHERE p.visibility = 'public'
       ORDER BY p.created_at DESC`
    );
    return rows;
  },

  findBySlug: async (slug) => {
    const [rows] = await db.query('SELECT * FROM Projects WHERE slug = ?', [slug]);
    return rows[0];
  },

  create: async (data) => {
    const [result] = await db.query(
      `INSERT INTO Projects (owner_id, title, slug, description, type, cover_url,
        repository_url, demo_url, technologies, status, visibility)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.ownerId, data.title, data.slug, data.description, data.type || 'personal', data.coverUrl || null,
        data.repositoryUrl || null, data.demoUrl || null, JSON.stringify(data.technologies || []), data.status || 'development', data.visibility || 'public']
    );
    return result.insertId;
  },

  update: async (id, data) => {
    await db.query(
      `UPDATE Projects SET title = ?, description = ?, type = ?, cover_url = ?,
        repository_url = ?, demo_url = ?, technologies = ?, status = ?, visibility = ?
       WHERE id = ?`,
      [data.title, data.description, data.type, data.coverUrl || null, data.repositoryUrl || null,
        data.demoUrl || null, JSON.stringify(data.technologies || []), data.status, data.visibility, id]
    );
  },

  delete: async (id) => { await db.query('DELETE FROM Projects WHERE id = ?', [id]); },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Projects WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = ProjectModel;
