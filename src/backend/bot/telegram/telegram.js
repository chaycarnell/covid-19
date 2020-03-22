const TeleBot = require('telebot');
const Queue = require('bull');

// Initiate the telegram bot
const telegram = new TeleBot(process.env.TELEGRAM_BOT);

// Start the telegram client
telegram.start();

// Queue config
const telegramQueueConfig = {
  attempts: 3,
  removeOnComplete: true,
  removeOnFail: false
};

/**
 * Telegram message send queue to avoid rate limit
 * Telegram bots can process 30 messages per second before being rate limited
 */
const telegramSendQueue = new Queue(
  'telegramSendQueue',
  process.env.REDISCLOUD_URL,
  {
    limiter: {
      max: 30,
      duration: 1000
    }
  }
).on('error', error => {
  console.log('TELEGRAM QUEUE ERROR', error);
});

/**
 * Handle sending telegram messages
 * @param {*} telegram_id user telegram Id to send to
 * @param {*} message message content
 */
const send = async ({ telegram_id, message }) =>
  telegram
    .sendMessage(telegram_id, message, { parseMode: 'Markdown' })
    .catch(err => {
      console.log(
        `TELEGRAM SEND ERROR:\nTO ID: ${telegram_id}\nMESSAGE:${message}\nERR:`,
        err
      );
      throw new Error(err.description);
    });

/**
 * Handle sending of telegram messages
 * @param {*} telegram_id user telegram Id to send to
 * @param {*} message message content
 * @param {*} queue boolean to queue message or send attempt immediately
 */
const sendMessage = ({ telegram_id, message, queue = true }) =>
  queue
    ? telegramSendQueue.add(
        {
          telegram_id,
          message
        },
        telegramQueueConfig
      )
    : send({ telegram_id, message });

// Process telegram messages to be sent
telegramSendQueue.process(async job =>
  send({
    telegram_id: job.data.telegram_id,
    message: job.data.message
  })
);

module.exports = {
  telegram,
  sendMessage
};
