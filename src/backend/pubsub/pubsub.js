const { RedisPubSub } = require('graphql-redis-subscriptions');
const redis = require('redis');
const subscriptions = require('./pubsub.subscriptions');

const urlSegments = new URL(process.env.REDISCLOUD_URL);
const options = {
  url: process.env.REDISCLOUD_URL,
  host: urlSegments.hostname,
  user: urlSegments.username,
  password: urlSegments.password,
  port: urlSegments.port
};

const pubsub = new RedisPubSub({
  publisher: redis.createClient(options),
  subscriber: redis.createClient(options)
});

const publishSomeUpdate = () =>
  pubsub.publish('SOME_UPDATE', { someUpdate: { id: 123 } });

setInterval(() => publishSomeUpdate(), 5000);

module.exports = {
  pubsub,
  publishSomeUpdate,
  subscriptions
};
