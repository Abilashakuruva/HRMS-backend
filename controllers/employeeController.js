const Employee = require('../models/Employee');


// CREATE
exports.createEmployee = (req, res) => {
  const orgId = req.user.organisation_id;
  const emp = {
    name: req.body.name,
    phone: req.body.phone,
    team_id: req.body.team_id || null,
    organisation_id: orgId
  };

  Employee.createEmployee(emp, (err, result) => {
    if (err) return res.status(500).json({error: err.message});
    res.status(201).json({ message: "Employee created successfully", id:result.id });
  });
};

// GET all
exports.getAllEmployees = (req, res) => {
  const orgId = req.user.organisation_id;

  Employee.findempByOrg(orgId,(err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// GET by ID
exports.findempByid = (req, res) => {
    const orgId = req.user.organisation_id;
    const empId = req.params.id;


    Employee.findByIdAndOrg(empId, orgId, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Employee not found" });

    res.json(row);


  });
};

// UPDATE
exports.updateEmployee = (req, res) => {
  const orgId = req.user.organisation_id;
  const updatedData = {
    ...req.body,
    organisation_id: orgId
  };
  Employee.updateEmployee(req.params.id, updatedData, (err, result) => {
    if (err) return res.status(500).json({error:err.message});

    if (result.changes === 0)
      return res.status(404).json({ message: "Employee not found" }); 

    res.json({ message: "Employee updated successfully" });
  });
};

// DELETE
exports.deleteEmployee = (req, res) => {
  const orgId = req.user.organisation_id;

  Employee.deleteEmployee(req.params.id,orgId, (err, result) => {
    if (err) return res.status(500).json({error:err.message});

    if (result.changes === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  });
};

exports.getEmployeesWithTeam = (req, res) => {
  const orgId = req.user.organisation_id;

  Employee.getEmployeesWithTeam(orgId, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ employees: rows });
  });
};