const db = require('../config/db');

// ✅ Create teams table (IMPORTANT)
db.run(`
  CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    organisation_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ✅ Create Team
const createTeam = (team, cb) => {
  const { name, organisation_id } = team;

  const sql = `INSERT INTO teams (name, organisation_id) VALUES (?, ?)`;

  db.run(sql, [name, organisation_id], function (err) {
    cb(err, { id: this.lastID });
  });
};

// ✅ Get All Teams by Organisation
const getTeamsByOrg = (orgId, cb) => {
  db.all(`SELECT * FROM teams WHERE organisation_id = ?`, [orgId], cb);
};

const findByIdAndOrg = (id, orgId, callback) => {
  db.get(
    `SELECT * FROM teams WHERE id = ? AND organisation_id = ?`,
    [id, orgId],
    callback
  );
};

// ✅ Update Team
const updateTeam = (id, data, cb) => {
  const sql = `
    UPDATE teams 
    SET name = ?
    WHERE id = ? AND organisation_id = ?
  `;

  db.run(sql, [data.name, id, data.organisation_id], function (err) {
    cb(err, { changes: this.changes });
  });
};

// ✅ Delete Team
const deleteTeam = (id, orgId, cb) => {
  const sql = `DELETE FROM teams WHERE id = ? AND organisation_id = ?`;

  db.run(sql, [id, orgId], function (err) {
    cb(err, { changes: this.changes });
  });
};

module.exports = {
  createTeam,
  getTeamsByOrg,
  updateTeam,
  deleteTeam,
  findByIdAndOrg
};
