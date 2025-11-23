const db = require('../config/db');

// Table create
db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT UNIQUE,
    team_id integer,
    organisation_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const createEmployee = (employee, callback) => {
  const { name, phone, team_id,organisation_id } = employee;

  const sql = `INSERT INTO employees (name, phone,team_id,organisation_id) VALUES (?, ?, ?,?)`;
  db.run(sql, [name,phone,team_id||null,organisation_id], function(err) {
    callback(err, { id: this.lastID });
  });
};


const findempByOrg = (orgId, callback) => {
  db.all(`SELECT * FROM employees WHERE organisation_id = ?`, [orgId], callback);
};

const findByIdAndOrg = (id, orgId, callback) => {
  db.get(
    `SELECT * FROM employees WHERE id = ? AND organisation_id = ?`,
    [id, orgId],
    callback
  );
};

// ✅ Update Employee
const updateEmployee = (id, employee, callback) => {
  const { name, phone, team_id,organisation_id } = employee;

  const sql = `
    UPDATE employees 
    SET name = ?, phone = ?, team_id = ? 
    WHERE id = ? AND organisation_id=?
  `;

  db.run(sql, [name, phone, team_id, id,organisation_id], function (err) {
    callback(err, { changes: this.changes });
  });
};

// ✅ Delete Employee
const deleteEmployee = (id,orgId, callback) => {
  const sql = `DELETE FROM employees WHERE id = ? AND organisation_id=?`;

  db.run(sql, [id,orgId], function (err) {
    callback(err, { changes: this.changes });
  });
};

const getEmployeesWithTeam = (orgId, cb) => {
  const sql = `
    SELECT e.id, e.name, e.phone, t.name AS team_name
    FROM employees e
    LEFT JOIN teams t ON e.team_id = t.id
    WHERE e.organisation_id = ?
  `;
  db.all(sql, [orgId], cb);
};


module.exports = {
  createEmployee,
  findempByOrg,
  updateEmployee,
  deleteEmployee,
  findByIdAndOrg,
  getEmployeesWithTeam
};