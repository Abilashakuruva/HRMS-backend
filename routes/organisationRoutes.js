const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organisationController');

router.post('/register', orgController.registerOrganisation);

module.exports = router;