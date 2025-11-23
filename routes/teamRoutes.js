const express = require('express');
const router = express.Router();

const teamCtrl= require('../controllers/teamController');
const auth=require('../middlewares/authMiddleware');



router.post('/', auth, teamCtrl.createTeam);
router.get('/', auth, teamCtrl.getTeams);
router.get('/:id', auth, teamCtrl.findteamByid); 
router.put('/:id', auth, teamCtrl.updateTeam);
router.delete('/:id', auth, teamCtrl.deleteTeam);

module.exports = router;
