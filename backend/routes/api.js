const express = require('express');
const router = express.Router();
const elephantController = require('../controllers/elephantController');

// Elephant routes
router.get('/elephants', elephantController.getAllElephants);
router.post('/elephants', elephantController.createElephant);
router.get('/elephants/region/:region', elephantController.getElephantsByRegion);

module.exports = router;