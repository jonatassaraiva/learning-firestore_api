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

/**
 * Read individual documents
 * @param {string} collectionName collection name on Firestore
 * @param {string} id document id
 * @return {object} a object data
 */
module.exports.readId = async (collectionName, id) => {
  const document = await _db.collection(collectionName).doc(id).get();
  return {
    id: document.id,
    ...document.data()
  }
}
/**
 * Read individual documents
 * @param {string} collectionName collection name on Firestore
 * @param {string[]} ids document ids
 * @return {object[]} a object data
 */
module.exports.readIds = async (collectionName, ids) => {
  const reads = ids.map(id => _db.collection(collectionName).doc(id).get());
  const result = await Promise.all(reads);
  return result.map(document => {
    return {
      id: document.id,
      ...document.data()
    }
  });
}

/**
 * @typedef Query
 * @type {import("firebase-admin").firestore.Query}
 */

/**
 * Execute a query `Firebase`
 * @param  {Query} query a query builded from db.collection(collectionName).where || .limit || a `Query` refers to a Query which you can read or listen to. You can also
 * @return {object[]} a object data
 */
module.exports.executeQuery = async (query) => {
  const result = [];
  const resultFirestore = await query.get();
  resultFirestore.forEach(document => {
    result.push({
      id: document.id,
      ...document.data()
    })
  })
  return result
}

module.exports.db = _db;