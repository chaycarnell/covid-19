const { collections } = require('../db/config');
const {
  insertOne,
  selectOne,
  selectMany,
  deleteMany,
  updateOne
} = require('../db/queries');

// USER QUERIES

const insertUser = ({ user = {} }) =>
  insertOne({
    collection: collections.USERS,
    value: user
  });

const deleteUser = ({ query = {} }) =>
  deleteMany({ collection: collections.USERS, query });

const getUser = ({ query = {} }) =>
  selectOne({ collection: collections.USERS, query });

const getUsers = ({ query = {}, sort = {} }) =>
  selectMany({ collection: collections.USERS, query, sort });

// COUNTRY QUERIES

const getCountries = ({ query = {}, sort = {} }) =>
  selectMany({ collection: collections.COUNTRIES, query, sort });

// UPDATE QUERIES

const getUpdate = ({ query = {}, sort = {} }) =>
  selectOne({ collection: collections.UPDATES, query, sort });

const setLatestUpdate = ({ query = {}, update = {} }) =>
  updateOne({ collection: collections.UPDATES, query, update });

module.exports = {
  insertUser,
  deleteUser,
  getUser,
  getUsers,
  getCountries,
  getUpdate,
  setLatestUpdate
};
