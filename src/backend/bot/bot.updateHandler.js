const { countByCountry } = require('../services/virusTrackerAPI');
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
  const hasUpdate = {
    total_active_cases:
      referenceUpdate.total_active_cases !== latestUpdate.total_active_cases,
    total_cases: referenceUpdate.total_cases !== latestUpdate.total_cases,
    total_deaths: referenceUpdate.total_deaths !== latestUpdate.total_deaths,
    total_new_cases_today:
      referenceUpdate.total_new_cases_today !==
      latestUpdate.total_new_cases_today,
    total_new_deaths_today:
      referenceUpdate.total_new_deaths_today !==
      latestUpdate.total_new_deaths_today,
    total_recovered:
      referenceUpdate.total_recovered !== latestUpdate.total_recovered,
    total_serious_cases:
      referenceUpdate.total_serious_cases !== latestUpdate.total_serious_cases
  };
  const updated = !!Object.keys(hasUpdate).find(k => hasUpdate[k]);
  return { updated, hasUpdate };
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
      countByCountry(countryCode)
    ]);
    // Check for change in last reported total cases to determine if updated
    const updateCheck = hasUpdated(updates[0], updates[1]);
    if (updates[0] && !updateCheck.updated) return;
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
        values: { ...updates[1], countryCode },
        updateKeys: { ...updateCheck.hasUpdate }
      })
    );
  });
};

module.exports = {
  checkForUpdates
};
