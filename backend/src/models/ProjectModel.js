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
    const fields = [];
    const values = [];
    if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.type !== undefined) { fields.push('type = ?'); values.push(data.type); }
    if (data.coverUrl !== undefined) { fields.push('cover_url = ?'); values.push(data.coverUrl); }
    if (data.repositoryUrl !== undefined) { fields.push('repository_url = ?'); values.push(data.repositoryUrl); }
    if (data.demoUrl !== undefined) { fields.push('demo_url = ?'); values.push(data.demoUrl); }
    if (data.technologies !== undefined) { fields.push('technologies = ?'); values.push(JSON.stringify(data.technologies)); }
    if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }
    if (data.visibility !== undefined) { fields.push('visibility = ?'); values.push(data.visibility); }
    if (fields.length === 0) return;
    values.push(id);
    const query = `UPDATE Projects SET ${fields.join(', ')} WHERE id = ?`;

    await db.query(query, values);
  },

  delete: async (id) => { await db.query('DELETE FROM Projects WHERE id = ?', [id]); },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Projects WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = ProjectModel;
