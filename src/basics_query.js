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
  const basicQuery = serviceFirestore.db.collection('posts')
    .where('title', '==', 'My Post');
  let result = await serviceFirestore.executeQuery(basicQuery);
  console.log('Query Post', result);
  console.log('<< End basic where', Date.now() - startTime);

  startTime = Date.now();
  console.log('>> Init and query');
  const andQuey = serviceFirestore.db.collection('users')
    .where('age', '==', 36)
    .where('sex', '==', 'M');
  result = await serviceFirestore.executeQuery(andQuey);
  console.log(result);
  console.log('<< End and query', Date.now() - startTime);

  startTime = Date.now();
  console.log('>> Init range');
  const rangeQuey = serviceFirestore.db.collection('users')
    .where('age', '>=', 30)
  result = await serviceFirestore.executeQuery(rangeQuey);
  console.log(result);
  console.log('<< End and query', Date.now() - startTime);
}

basic();