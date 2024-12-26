const express = require('express');
const router = express.Router();
const labourController = require('../controllers/labourController');

// Routes
router.get('/', labourController.getAllLabours);
router.get('/:id', labourController.getLabourById);
router.post('/', labourController.createLabour);
router.put('/:id', labourController.updateLabour);
router.delete('/:id', labourController.deleteLabour);

module.exports = router;
