const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');

router.get('/countGlobal', publicController.countGlobal);
router.get('/countByCountry', publicController.countByCountry);
router.get('/countryTimeline', publicController.countryTimeline);

module.exports = router;
