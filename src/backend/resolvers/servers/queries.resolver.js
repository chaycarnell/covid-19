const {
  countGlobal,
  countByCountry,
  newsByCountry,
  countryTimeline
} = require('../../services/virusTrackerAPI');
const { pubsub } = require('../../pubsub/pubsub');

const resolver = {
  Query: {
    countGlobal: async () => await countGlobal(),
    // countByCountry: async (obj, args) => {
    //   console.log(obj, args);
    //   return await countByCountry();
    // },
    countryTimeline: async (obj, args) => {
      const x = await countryTimeline(args.countryCode);
      console.log(x);
      return await countryTimeline(args.countryCode);
    }
  },
  Subscription: {
    someUpdate: {
      subscribe: () => pubsub.asyncIterator(['SOME_UPDATE'])
    }
  }
};

exports.resolver = resolver;
