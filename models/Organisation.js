const db = require('../config/db');

// ✅ Auto create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS organisations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const createOrganisation = (name, email, cb) => {
  const sql = 'INSERT INTO organisations (name, email) VALUES (?, ?)';
  db.run(sql, [name, email], function (err) {
    cb(err, { id: this.lastID });
  });
};

const getOrganisationById = (id, cb) => {
  db.get('SELECT * FROM organisations WHERE id = ?', [id], cb);
};

module.exports = {
  createOrganisation,
  getOrganisationById
};
