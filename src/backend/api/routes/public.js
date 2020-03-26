const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');

router.get('/countGlobal', publicController.getGlobalCount);
router.get('/countByCountry', publicController.getCountByCountry);
router.get('/newsByCountry', publicController.getNewsByCountry);
router.get('/countryTimeline', publicController.getCountryTimeline);

module.exports = router;
