const axios = require('axios');
const apiUrl =
  process.env.DATA_ENDPOINT || 'https://thevirustracker.com/free-api';

/**
 * Return data from the virus tracker api, query contains the desired path
 * @param {*} query The path and value to query the API by
 */
const getData = async ({ query = {} }) =>
  axios({
    method: 'get',
    url: `${apiUrl}`,
    params: {
      ...query
    }
  })
    .then(res => res.data)
    .catch(() => null);

/**
 * Returns a snapshot of global virus figures
 */
const countGlobal = async () => {
  const data = await getData({ query: { global: 'stats' } });
  return (data && data.results[0]) || null;
};

/**
 * Returns a country specific snapshot of virus figures
 * @param {*} countryCode Country code to query by i.e. "GB"
 */
const countByCountry = async countryCode => {
  const data = await getData({
    query: { countryTotal: countryCode }
  });
  return (data && data.countrydata[0]) || null;
};

/**
 * Returns a country specific timeline of virus figures
 * @param {*} countryCode Country code to query by i.e. "GB"
 */
const countryTimeline = async countryCode => {
  const data = await getData({
    query: { countryTimeline: countryCode }
  });
  const timelineData =
    data &&
    data.countrytimelinedata &&
    data.countrytimelinedata[0].info &&
    data.timelineitems.length
      ? { ...data.countrytimelinedata[0].info, values: data.timelineitems[0] }
      : null;
  timelineData && delete timelineData.values.stat;
  return timelineData
    ? {
        ...timelineData,
        values: Object.keys(timelineData.values)
          .map(key => ({
            ...timelineData.values[key],
            date: new Date(key).getTime()
          }))
          .sort((a, b) => a.date - b.date)
      }
    : null;
};

module.exports = {
  countGlobal,
  countByCountry,
  countryTimeline
};
