const {
  countGlobal,
  countByCountry,
  countryTimeline
} = require('../../api/controllers/public');

const resolver = {
  Query: {
    // countGlobal: async (obj, args) => {
    //   console.log(obj, args);
    //   return await countGlobal();
    // },
    // countByCountry: async (obj, args) => {
    //   console.log(obj, args);
    //   return await countByCountry();
    // },
    // countryTimeline: async (obj, args) => {
    //   console.log(obj, args);
    //   return await countryTimeline();
    // }
  }
};

exports.resolver = resolver;
