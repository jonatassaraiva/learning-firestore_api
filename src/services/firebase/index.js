'use strict';

//
// dependencies
const firebaseAdmin = require('firebase-admin');

//
// configure firebase
firebaseAdmin.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const _db = firebaseAdmin.firestore();

module.exports.readIds = async (collectionName, ids) => {
  const reads = ids.map(id => _db.collection(collectionName).doc(id).get());
  const result = await Promise.all(reads);
  return result.map(read => {
    return {
      id: read.id,
      ...read.data()
    }
  });
}
module.exports.readId = async (collectionName, id) => {
  const read = await _db.collection(collectionName).doc(id).get();
  return {
    id: read.id,
    ...read.data()
  }
}
module.exports.db = _db;