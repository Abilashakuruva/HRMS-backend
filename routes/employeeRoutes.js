const express = require('express');
const router = express.Router();

const empCtrl= require('../controllers/employeeController');
const auth=require('../middlewares/authMiddleware');

router.get('/with-team', auth, empCtrl.getEmployeesWithTeam);

// ✅ GET all employees
router.get('/',auth,empCtrl.getAllEmployees);

// ✅ GET employee by id
router.get('/:id',auth,empCtrl.findempByid);

// ✅ CREATE employee
router.post('/',auth,empCtrl.createEmployee);

// ✅ DELETE employee
router.delete('/:id',auth,empCtrl.deleteEmployee);

// ✅ UPDATE employee
router.put('/:id',auth,empCtrl.updateEmployee);



module.exports = router;
