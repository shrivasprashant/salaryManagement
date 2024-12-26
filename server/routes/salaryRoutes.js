const express = require('express');
const { createSalary, updateSalaryStatus, getSalaries } = require('../controllers/salaryController');

const router = express.Router();

// Create salary
router.post('/create', createSalary);

// Update salary status
router.patch('/update-status', updateSalaryStatus);

// Get salary records
router.get('/', getSalaries);

module.exports = router;
