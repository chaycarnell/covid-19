const { countByCountry } = require('../api/controllers/public');
const {
  getCountries,
  getUsers,
  getUpdate,
  setLatestUpdate
} = require('./bot.queries');
const { sendCountryUpdate } = require('./bot.messages');

/**
 * Compare the reference and latest update values to determine if new data is available
 * @param {*} referenceUpdate
 * @param {*} latestUpdate
 */
const hasUpdated = (referenceUpdate, latestUpdate) => {
  if (!referenceUpdate || !latestUpdate) return false;
  if (
    referenceUpdate.total_active_cases === latestUpdate.total_active_cases &&
    referenceUpdate.total_cases === latestUpdate.total_cases &&
    referenceUpdate.total_deaths === latestUpdate.total_deaths &&
    referenceUpdate.total_new_cases_today ===
      latestUpdate.total_new_cases_today &&
    referenceUpdate.total_new_deaths_today ===
      latestUpdate.total_new_deaths_today &&
    referenceUpdate.total_recovered === latestUpdate.total_recovered &&
    referenceUpdate.total_serious_cases === latestUpdate.total_serious_cases
  )
    return false;
  return true;
};

/**
 * Check for updates to country codes
 */
const checkForUpdates = async () => {
  // Get the array of support countries
  const supportedCountries = await getCountries({});
  // Loop over each supported country code to check for updates
  supportedCountries.forEach(async country => {
    const countryCode = country.countryCode;
    // Get the reference last update an latest value from API
    const updates = await Promise.all([
      getUpdate({
        query: { countryCode }
      }),
      countByCountry({
        query: { countryCode }
      })
    ]);
    // Check for change in last reported total cases to determine if updated
    if (updates[0] && !hasUpdated(updates[0], updates[1])) return;
    // Set the the latest values for country update
    await setLatestUpdate({
      query: { countryCode },
      update: { countryCode, ...updates[1] }
    });
    // Get subscribers to country code
    const subscribers = await getUsers({ query: { countryCode } });
    // Send latest update to all country subscribers
    subscribers.forEach(subscriber =>
      sendCountryUpdate({
        message: { from: { id: subscriber.userId } },
        values: { ...updates[1], countryCode }
      })
    );
  });
};

module.exports = {
  checkForUpdates
};
