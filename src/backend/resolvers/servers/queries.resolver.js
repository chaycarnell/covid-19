const { countGlobal } = require('../../api/controllers/public');
const { pubsub } = require('../../pubsub/pubsub');

const resolver = {
  Query: {
    countGlobal: async () => await countGlobal()
    // countByCountry: async (obj, args) => {
    //   console.log(obj, args);
    //   return await countByCountry();
    // },
    // countryTimeline: async (obj, args) => {
    //   console.log(obj, args);
    //   return await countryTimeline();
    // }
  },
  Subscription: {
    someUpdate: {
      subscribe: () => pubsub.asyncIterator(['SOME_UPDATE'])
    }
  }
};

exports.resolver = resolver;
