const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.post('/register',userController.registerUser);
router.post('/login',userController.login);

router.get('/',userController. getUsers); // GET ALL USERS

// Protected test route
router.get('/profile', auth, (req, res) => {
  res.json({ message: '✅ Protected Route', user: req.user });
});

module.exports = router;
