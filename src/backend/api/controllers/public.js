const {
  countGlobal,
  countByCountry,
  newsByCountry,
  countryTimeline
} = require('../../services/virusTrackerAPI');

const getGlobalCount = async (req, res) => {
  const payload = await countGlobal();
  res.json({
    success: true,
    message: 'Global count data',
    payload
  });
};

const getCountByCountry = async (req, res) => {
  const payload = await countByCountry(req.query.countryCode);
  res.json({
    success: true,
    message: 'Country specific count data',
    payload
  });
};

const getNewsByCountry = async (req, res) => {
  const payload = await newsByCountry(req.query.countryCode);
  res.json({
    success: true,
    message: 'Country specific news',
    payload
  });
};

const getCountryTimeline = async (req, res) => {
  const payload = await countryTimeline(req.query.countryCode);
  res.json({
    success: true,
    message: 'Country specific count data',
    payload
  });
};

module.exports = {
  getGlobalCount,
  getCountByCountry,
  getNewsByCountry,
  getCountryTimeline
};
