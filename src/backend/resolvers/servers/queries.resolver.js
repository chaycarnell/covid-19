const {
  countGlobal,
  countryTimeline
} = require('../../services/virusTrackerAPI');
const { pubsub } = require('../../pubsub/pubsub');

const resolver = {
  Query: {
    countGlobal: async () => await countGlobal(),
    countryTimeline: async (obj, args) =>
      await countryTimeline(args.countryCode)
  },
  Subscription: {
    someUpdate: {
      subscribe: () => pubsub.asyncIterator(['SOME_UPDATE'])
    }
  }
};

exports.resolver = resolver;
