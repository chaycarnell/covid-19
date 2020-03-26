const { db } = require('./config');

const insertOne = ({ collection = '', value = {} }) =>
  db()
    .collection(collection)
    .insertOne(value);

const insertMany = ({ collection = '', values = [] }) =>
  db()
    .collection(collection)
    .insertMany(values);

const selectOne = ({ collection = '', query = {} }) =>
  db()
    .collection(collection)
    .findOne(query);

const selectMany = ({ collection = '', query = {}, sort = {} }) =>
  db()
    .collection(collection)
    .find(query)
    .sort(sort)
    .toArray();

const updateOne = ({ collection = '', query = {}, update = {} }) =>
  db()
    .collection(collection)
    .updateOne(
      query,
      {
        $set: update
      },
      { upsert: true, safe: false }
    );

const updateMany = ({ collection = '', query = {}, update = {} }) =>
  db()
    .collection(collection)
    .updateMany(query, {
      $set: update
    });

const incrementOne = ({ collection = '', query = {}, update = {} }) =>
  db()
    .collection(collection)
    .updateOne(
      query,
      {
        $inc: update
      },
      { upsert: true, safe: false }
    );

const deleteOne = ({ collection = '', query = {} }) =>
  db()
    .collection(collection)
    .deleteOne(query);

const deleteMany = ({ collection = '', query = {} }) =>
  db()
    .collection(collection)
    .deleteMany(query);

module.exports = {
  insertOne,
  insertMany,
  selectOne,
  selectMany,
  updateOne,
  updateMany,
  incrementOne,
  deleteOne,
  deleteMany
};
