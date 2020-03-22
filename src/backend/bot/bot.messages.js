const { sendMessage } = require('./telegram/telegram');
const { emojis } = require('./bot.emotes');

/**
 * Handle sending help text
 * @param {*} message  message passed in telegram
 */
const sendHelpText = ({ message }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: `${emojis.biohazard} Covid19 Bot ${emojis.biohazard}\n\nThis bot provides updates on the current status of the Covid 19 pandemic using data sourced from https://thevirustracker.com\n\nCommands:\n\n/global - Provides a one time global update on Covid-19\n\n/au - Registers to Australian specific updates on Covid-19 when new data is available\n\n/cn - Registers to China specific updates on Covid-19 when new data is available\n\n/gb - Registers to Great Britain specific updates on Covid-19 when new data is available\n\n/us - Registers to United States specific updates on Covid-19 when new data is available\n\n/stop - Stops the bot from sending you updates`
  });

/**
 * Handle sending undhandled message command response
 * @param {*} message  message passed in telegram
 */
const sendUnhandledText = ({ message }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: 'Command not recognised, type /help'
  });

/**
 * Handle notifying user added
 * @param {*} message  message passed in telegram
 * @param {*} countryCode country code
 */
const notifyUserAdded = ({ message, countryCode }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: `You have been registered to receive updates for ${countryCode}.`
  });

/**
 * Handle notifying user removed
 * @param {*} message  message passed in telegram
 */
const notifyUserRemoved = ({ message }) =>
  sendMessage({
    telegram_id: message.from.id,
    message:
      'You have been unregistered, if you would like to be added again simply send the command for the country code you wish to be updated on.'
  });

/**
 * Notify user already registered for country updates
 * @param {*} message  message passed in telegram
 * @param {*} countryCode country code
 */
const notifyAlreadyRegistered = ({ message, countryCode }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: `You are already registered to receive updates for ${countryCode}.`
  });

/**
 * Handle sending a status update for global numbers
 * @param {*} message  message passed in telegram
 * @param {*} values status update values to be sent
 */
const sendGlobalUpdate = ({ message, values }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: `${emojis.globe} Covid-19 Global Update ${emojis.globe}\n\nTotal Cases: ${values.total_cases}\nTotal Recovered: ${values.total_recovered}\nTotal Deaths: ${values.total_deaths}\n\nNew Daily Cases:  ${values.total_new_cases_today}\nNew Deaths Today: ${values.total_new_deaths_today}\n\nSummary\nThere has been ${values.total_cases} confirmed cases globally. Of these cases ${values.total_recovered} have recovered and ${values.total_active_cases} are active with ${values.total_serious_cases} cases believed to be serious. Sadly ${values.total_deaths} people have died.\n\nDon't forget to wash your hands ${emojis.soap}`
  });

/**
 * Generate a snippet of latest news articles for country
 * @param {*} news array of news items
 */
const generateNews = news =>
  `News${news.map(article => `\n\n[${article.title}](${article.url})`)}\n\n`;

/**
 * Handle sending a status update for GB only
 * @param {*} message  message passed in telegram
 * @param {*} values status update values to be sent
 * @param {*} updateKeys keys of updated values to be displayed
 */
const sendCountryUpdate = ({ message, values, updateKeys = {} }) =>
  sendMessage({
    telegram_id: message.from.id,
    message: `${emojis[values.countryCode]} Covid-19 ${
      values.countryCode
    } Update ${emojis[values.countryCode]}\n\nTotal Cases: ${
      values.total_cases
    }${updateKeys.total_cases ? ' (Updated)' : ''}\nTotal Recovered: ${
      values.total_recovered
    }${updateKeys.total_recovered ? ' (Updated)' : ''}\nTotal Deaths: ${
      values.total_deaths
    }${updateKeys.total_deaths ? ' (Updated)' : ''}\n\nNew Daily Cases:  ${
      values.total_new_cases_today
    }${
      updateKeys.total_new_cases_today ? ' (Updated)' : ''
    }\nNew Deaths Today: ${values.total_new_deaths_today}${
      updateKeys.total_new_deaths_today ? ' (Updated)' : ''
    }\n\n${
      values.news ? generateNews(values.news) : ''
    }Don't forget to wash your hands ${emojis.soap}`
  }).then(result => {
    console.log('Send message result:\n', result);
  });

module.exports = {
  sendHelpText,
  sendUnhandledText,
  notifyUserAdded,
  notifyUserRemoved,
  notifyAlreadyRegistered,
  sendGlobalUpdate,
  sendCountryUpdate
};
