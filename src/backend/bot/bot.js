/**
 * @author Chay Carnell <chaycarnell@gmail.com>
 * This bot consumes a webhook from metatrader terminals to report trade status and account stats
 */
require('dotenv').config();
const { getGlobalStatusUpdate, getGBStatusUpdate } = require('./bot.commands');
const { telegram, sendMessage } = require('./telegram/telegram');
const { emojis } = require('./bot.emotes');

// Store reference to telegram master account
const telegram_master = process.env.TELEGRAM_MASTER;

/**
 * Notify bot up, do not queue message
 */
// sendMessage({
//   telegram_id: telegram_master,
//   message: `${emojis.connection} Bot Connected ${emojis.connection}`,
//   queue: false
// });

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
        sendMessage({
          telegram_id: message.from.id,
          message: `${emojis.biohazard} Covid19 Bot ${emojis.biohazard}\n\nThis bot provides updates on the current status of the Covid 19 pandemic using data sourced from https://thevirustracker.com.\n\nCommands:\n\n/global - Provides a one time global update on Covid-19\n\n/gb - Registers to a GB specific update on Covid-19 when new data is available`
        });
      } else if (message.text === '/update') {
        getGlobalStatusUpdate({ message });
      } else if (message.text === '/gb') {
        reigsterGBUpdates({ message });
      } else {
        sendMessage({
          telegram_id: message.from.id,
          message: 'Command not recognised, type /help'
        });
      }
    } catch (err) {
      // Catch any errors when handling a message
      sendMessage({
        telegram_id: message.from.id,
        message: 'Command not recognised, type /help'
      });
    }
  };

  /**
   * Set a listener for messages to the bot, this ensures only users in the database can interact with the bot
   */
  telegram.on('text', async msg => {
    processUserMessage(msg);
    if (Number(msg.from.id) !== Number(telegram_master)) {
      sendMessage({
        telegram_id: telegram_master,
        message: `Message from username: ${msg.from.username ||
          msg.from.first_name}\nContent: ${msg.text}`
      });
    }
  });
};

module.exports = {
  launch
};
