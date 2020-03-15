const axios = require('axios');
const apiUrl =
  process.env.DATA_ENDPOINT || 'https://thevirustracker.com/free-api';

const getData = ({ query = {} }) =>
  axios({
    method: 'get',
    url: `${apiUrl}`,
    params: {
      ...query
    }
  })
    .then(res => res.data)
    .catch(() => null);

module.exports = {
  countGlobal: async (req, res) => {
    const data = await getData({ query: { global: 'stats' } });
    const result = data.results[0] || null;
    if (!res) return result;
    res.json({
      success: true,
      message: 'Global count data',
      payload: data.results[0] || null
    });
  },
  countByCountry: async (req, res) => {
    const data = await getData({
      query: { countryTotal: req.query.countryCode }
    });
    const result = data.countrydata[0] || null;
    if (!res) return result;
    res.json({
      success: true,
      message: 'Country specific count data',
      payload: result
    });
  },
  countryTimeline: async (req, res) => {
    const data = await getData({
      query: { countryTimeline: req.query.countryCode }
    });
    res.json({
      success: true,
      message: 'Country specific count data',
      payload:
        data.countrytimelinedata[0].info && data.timelineitems.length
          ? { ...data.countrytimelinedata[0].info, values: data.timelineitems }
          : null
    });
  }
};
