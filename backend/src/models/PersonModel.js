/**
 * Modelo para operaciones CRUD sobre la tabla Person en MySQL.
 * Gestiona datos personales (nombre, cédula, teléfono, email).
 */
const db = require('../config/database');

const PersonModel = {
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Person WHERE ID = ?', [id]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM Person WHERE email = ?', [email]);
    return rows[0];
  },

  findByIDCard: async (idCard) => {
    const [rows] = await db.query('SELECT * FROM Person WHERE IDCard = ?', [idCard]);
    return rows[0];
  },

  create: async (personData) => {
    const { firstName, middleName, firstSurname, secondLastName, IDCard, cellular, phone, email } = personData;
    const [result] = await db.query(
      'INSERT INTO Person (firstName, middleName, firstSurname, secondLastName, IDCard, cellular, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, middleName, firstSurname, secondLastName, IDCard, cellular, phone, email]
    );
    return result.insertId;
  },

  update: async (id, personData) => {
    const { firstName, middleName, firstSurname, secondLastName, IDCard, cellular, phone, email } = personData;
    await db.query(
      'UPDATE Person SET firstName = ?, middleName = ?, firstSurname = ?, secondLastName = ?, IDCard = ?, cellular = ?, phone = ?, email = ? WHERE ID = ?',
      [firstName, middleName, firstSurname, secondLastName, IDCard, cellular, phone, email, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM Person WHERE ID = ?', [id]);
  },

  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM Person');
    return rows;
  }
};

module.exports = PersonModel;
