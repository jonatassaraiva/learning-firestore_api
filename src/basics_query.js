'use strict';

//
// environment variables file
require('dotenv').config();

const serviceFirestore = require('./services/firebase');

const basic = async () => {
  console.log('>> Init test connection');
  let startTime = Date.now();
  await serviceFirestore.readId('_test', 'ping');
  console.log('<< End to test connection', Date.now() - startTime);

  startTime = Date.now();
  console.log('>> Init basic where');
  let query = serviceFirestore.db.collection('posts')
    .where('title', '==', 'My Post');
  let result = await serviceFirestore.executeQuery(query);
  console.log(result);
  console.log('<< End basic where', Date.now() - startTime);

  startTime = Date.now();
  console.log('>> Init and query');
  query = serviceFirestore.db.collection('users')
    .where('age', '==', 36)
    .where('sex', '==', 'M');
  result = await serviceFirestore.executeQuery(query);
  console.log(result);
  console.log('<< End and query', Date.now() - startTime);

  startTime = Date.now();
  console.log('>> Init range');
  query = serviceFirestore.db.collection('users')
    .where('age', '>=', 30)
  result = await serviceFirestore.executeQuery(query);
  console.log(result);
  console.log('<< End and query', Date.now() - startTime);

  startTime = Date.now();
  console.log('>> Init query with index');
  query = serviceFirestore.db.collection('users')
    .where('sex', '==', 'M')
    .where('age', '>=', 30)
  result = await serviceFirestore.executeQuery(query);
  console.log(result);
  console.log('<< End query with index', Date.now() - startTime);
}

basic();