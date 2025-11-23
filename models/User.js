const db = require('../config/db');

// Table create
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organisation_id INTEGER,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'HR',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organisation_id) REFERENCES organisations(id)

  )
`);

const createUser = (user, callback) => {
  const { organisation_id, name, email, password, role  } = user;

  const sql = `INSERT INTO users (organisation_id, name, email, password, role ) VALUES (?, ?, ?, ? , ?)`;
  db.run(sql, [organisation_id, name, email, password, role ], function(err) {
    callback(err, { id: this.lastID });
  });
};



const getAllUsers = (callback) => {
  db.all("SELECT * FROM users", [], callback);
};

const findUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};

module.exports = {
  createUser,
  getAllUsers,
  findUserByEmail
};
