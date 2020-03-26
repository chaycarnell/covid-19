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
 * Extract latest news articles from the news object
 * @param {*} news
 */
const extractNews = (news = {}) => {
  try {
    // Returns 10 news items, return 11 as last item "stat" is excluded
    const items = Object.keys(news)
      .slice(-11)
      .reduce((acc, item) => {
        if (item === 'stat') return acc;
        return [...acc, news[item]];
      }, []);
    return items;
  } catch {
    return null;
  }
};

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
 * Returns a country specific snapshot of virus related news
 * @param {*} countryCode Country code to query by i.e. "GB"
 */
const newsByCountry = async countryCode => {
  const data = await getData({
    query: { countryNewsTotal: countryCode }
  });
  const news =
    data && data.countrynewsitems && extractNews(data.countrynewsitems[0]);
  return news || null;
};

/**
 * Returns a country specific timeline of virus figures
 * @param {*} countryCode Country code to query by i.e. "GB"
 */
const countryTimeline = async countryCode => {
  const data = await getData({
    query: { countryTimeline: countryCode }
  });
  return data && data.countrytimelinedata[0].info && data.timelineitems.length
    ? { ...data.countrytimelinedata[0].info, values: data.timelineitems }
    : null;
};

module.exports = {
  countGlobal,
  countByCountry,
  newsByCountry,
  countryTimeline
};
