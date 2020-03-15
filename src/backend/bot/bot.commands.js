const { countGlobal, countByCountry } = require('../api/controllers/public');
const { sendMessage } = require('./telegram/telegram');
const { emojis } = require('./bot.emotes');

/**
 * Handle sending a status update for global numbers
 * @param {*} message  message passed in telegram
 * @param {*} values status update values to be sent
 */
const sendGlobalStatusUpdate = ({ message, values }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: `${emojis.biohazard} Covid-19 Update ${emojis.biohazard}\n\nTotal Cases: ${values.total_cases}\nTotal Recovered: ${values.total_recovered}\nTotal Deaths: ${values.total_deaths}\n\nNew Daily Cases:  ${values.total_new_cases_today}\nNew Deaths Today: ${values.total_new_deaths_today}\n\nSummary\nThere has been ${values.total_cases} confirmed cases globally. Of these cases ${values.total_recovered} have recovered and ${values.total_active_cases} are active with ${values.total_serius_cases} cases believed to be serious. Sadly ${values.total_deaths} people have died.\n\nDon't forget to wash your hands ${emojis.soap}`
  });

/**
 * Handle sending a status update for GB only
 * @param {*} message  message passed in telegram
 * @param {*} values status update values to be sent
 */
const sendGBStatusUpdate = ({ message, values }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: `${emojis.biohazard} Covid-19 GB Update ${emojis.biohazard}\n\nTotal Cases: ${values.total_cases}\nTotal Recovered: ${values.total_recovered}\nTotal Deaths: ${values.total_deaths}\n\nNew Daily Cases:  ${values.total_new_cases_today}\nNew Deaths Today: ${values.total_new_deaths_today}\n\nSummary\nThere has been ${values.total_cases} confirmed cases in GB. Of these cases ${values.total_recovered} have recovered and ${values.total_active_cases} are active with ${values.total_serius_cases} cases believed to be serious. Sadly ${values.total_deaths} people have died in GB.\n\nDon't forget to wash your hands ${emojis.soap}`
  });

/**
 * Handle getting an updated count for the user message
 * @param {*} message message passed in telegram
 */
const getGlobalStatusUpdate = async ({ message }) => {
  const values = await countGlobal();
  sendGlobalStatusUpdate({ message, values });
};

/**
 * Handle getting an updated count for the user message
 * @param {*} message message passed in telegram
 */
const getGBStatusUpdate = async ({ message }) => {
  const values = await countByCountry({ query: { countryCode: 'GB' } });
  sendGBStatusUpdate({ message, values });
};

module.exports = {
  getGlobalStatusUpdate,
  getGBStatusUpdate
};
