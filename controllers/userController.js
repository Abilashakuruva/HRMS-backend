const Org=require('../models/Organisation');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.registerUser =  (req, res) => {
  const { orgName, name, email, password } = req.body;

  if (!orgName) {
    return res.status(400).json({ message: "Organisation name required" });
  }

    User.findUserByEmail(email, async (err, existingUser) => {
    if (existingUser){
       return res.status(400).json({ message: 'User already exists' });
      }

   try {
      // 1. Create organisation first
      Org.createOrganisation(orgName, email, async (err, orgResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const organisationId = orgResult.id;

        const hashedPassword = await bcrypt.hash(password, 10);
    

    User.createUser({ name, email, password: hashedPassword,organisation_id: organisationId,
          role: 'Admin' }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: '✅ Organisation & Admin User created successfully',
        organisationId,
        userId: result.id
      });
      
    });

  });

   } catch (error) {
      res.status(500).json({ error: error.message });
    }
   }); 
};


exports.getUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: '✅ User list fetched',
      total: users.length,
      users

    });
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, async (err, user) => {
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email,organisation_id: user.organisation_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: '✅ Login Successful',
      token,
       user: {
    id: user.id,
    name: user.name,
    email: user.email,
    organisation_id: user.organisation_id,
    role: user.role

  }
  

    });
  });
};