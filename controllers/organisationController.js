const Organisation = require('../models/Organisation');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerOrganisation = (req, res) => {
  const { organisationName, adminName, email, password } = req.body;

  if (!organisationName || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  // 1. Create Organisation
  Organisation.createOrganisation(organisationName, email, async (err, orgResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const organisation_id = orgResult.id;

    // 2. Create Admin User
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      organisation_id,
      name: adminName || 'Admin',
      email,
      password: hashedPassword,
      role: 'ADMIN'
    };

    User.createUser(userData, (err, userResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: 'Organisation & Admin created successfully',
        organisation_id,
        admin_user_id: userResult.id
      });
    });
  });
};
