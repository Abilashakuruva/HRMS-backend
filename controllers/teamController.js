const Team = require('../models/Team');

// CREATE TEAM
exports.createTeam = (req, res) => {
  const orgId = req.user.organisation_id;
  const { name } = req.body;

  Team.createTeam({ name, organisation_id: orgId }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: '✅ Team created', id: result.id });
  });
};

// GET ALL TEAMS
exports.getTeams = (req, res) => {
  console.log("USER OBJECT =>", req.user);

  // if (!req.user) {
  //   return res.status(401).json({ message: "No user from token" });
  // }


  const orgId = req.user.organisation_id;

  Team.getTeamsByOrg(orgId, (err, teams) => {
    if (err) return res.status(500).json(err);
    res.json(teams);
  });
};

// GET by ID
exports.findteamByid = (req, res) => {
    const orgId = req.user.organisation_id;
    const Id = req.params.id;


    Team.findByIdAndOrg(Id, orgId, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Team not found" });

    res.json(row);


  });
};

// ✅ UPDATE TEAM
exports.updateTeam = (req, res) => {
  const orgId = req.user.organisation_id;
  const teamId = req.params.id;
  const { name } = req.body;

  Team.updateTeam(teamId, { name, organisation_id: orgId }, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "✅ Team updated successfully" });
  });
};

// ✅ DELETE TEAM
exports.deleteTeam = (req, res) => {
  const orgId = req.user.organisation_id;
  const teamId = req.params.id;

  Team.deleteTeam(teamId, orgId, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "✅ Team deleted successfully" });
  });
};
