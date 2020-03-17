/**
 * @author Chay Carnell <chaycarnell@gmail.com>
 */
/**
/help - Lists information about this bot
/global - Provides a global update on Covid-19
/au - Subscribes to AU specific updates on Covid-19
/gb - Subscribes to GB specific updates on Covid-19
/us - Subscribes to US specific updates on Covid-19
/stop - Unregister yourself from updates
 */
require('dotenv').config();
const { telegram } = require('./telegram/telegram');
const {
  getGlobalStatusUpdate,
  registerCountryUpdates,
  unsubscribeUser
} = require('./bot.commands');
const { checkForUpdates } = require('./bot.updateHandler');
const { sendHelpText, sendUnhandledText } = require('./bot.messages');

/**
 * Launch the bot
 */
const launch = async () => {
  /**
   * Process messages recieved from telegram messenger
   * @param {*} message
   */
  const processUserMessage = message => {
    try {
      if (message.text === '/help' || message.text === '/start') {
        sendHelpText({ message });
      } else if (message.text === '/stop') {
        unsubscribeUser({ message });
      } else if (message.text === '/global') {
        getGlobalStatusUpdate({ message });
      } else if (message.text === '/au') {
        registerCountryUpdates({ message, countryCode: 'AU' });
      } else if (message.text === '/gb') {
        registerCountryUpdates({ message, countryCode: 'GB' });
      } else if (message.text === '/us') {
        registerCountryUpdates({ message, countryCode: 'US' });
      } else {
        sendUnhandledText({ message });
      }
    } catch (err) {
      sendUnhandledText({ message });
    }
  };

  /**
   * Set a listener for messages to the bot, this ensures only users in the database can interact with the bot
   */
  telegram.on('text', async msg => {
    processUserMessage(msg);
  });

  // Check for country updates every minute
  setInterval(() => {
    checkForUpdates();
  }, 60000);
};

module.exports = {
  launch
};
