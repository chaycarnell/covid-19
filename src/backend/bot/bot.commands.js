const { countGlobal, countByCountry } = require('../api/controllers/public');
const { insertUser, getUser, deleteUser } = require('./bot.queries');
const {
  notifyUserAdded,
  notifyUserRemoved,
  notifyAlreadyRegistered,
  sendGlobalUpdate,
  sendCountryUpdate
} = require('./bot.messages');

/**
 * Handle getting an updated count for the user message
 * @param {*} message message passed in telegram
 */
const getGlobalStatusUpdate = async ({ message }) => {
  const values = await countGlobal();
  values && sendGlobalUpdate({ message, values });
};

/**
 * Handle registering a user to a country code for updates
 * @param {*} message message passed in telegram
 */
const registerCountryUpdates = async ({ message, countryCode }) => {
  const user = await getUser({
    query: { userId: message.from.id, countryCode }
  });
  if (user) {
    notifyAlreadyRegistered({ message, countryCode });
  } else {
    await insertUser({
      user: {
        userId: message.from.id,
        name: message.from.username || msg.from.first_name,
        countryCode
      }
    });
    await notifyUserAdded({ message, countryCode });
    const values = await countByCountry({ query: { countryCode } });
    values &&
      sendCountryUpdate({ message, values: { ...values, countryCode } });
  }
};

/**
 * Handle removing a user
 * @param {*} message message passed in telegram
 */
const unsubscribeUser = async ({ message }) => {
  await deleteUser({
    query: { userId: message.from.id }
  });
  notifyUserRemoved({ message });
};

module.exports = {
  getGlobalStatusUpdate,
  registerCountryUpdates,
  unsubscribeUser
};
