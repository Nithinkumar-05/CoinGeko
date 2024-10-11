const express = require('express');
const router = express.Router();
const { getCryptoStats } = require('../controllers/fetchData.controller'); 
const getStandardDeviation = require('../controllers/deviation.controller');
// Define the /stats route and delegate to the controller
router.get('/stats', getCryptoStats);
router.get('/deviation',getStandardDeviation);
module.exports = router;
