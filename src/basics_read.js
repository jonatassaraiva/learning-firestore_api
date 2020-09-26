'use strict';

//
// environment variables file
require('dotenv').config();

const serviceFirestore = require('./services/firebase');

const readTagsOfPost = async (postId) => {
  console.log('>> Init test connection');
  const startTimeToPing = Date.now();
  await serviceFirestore.readId('_test', 'ping');
  console.log('<< End to test connection', Date.now() - startTimeToPing);

  console.log('>> Init read post');
  const startTimeReadPost = Date.now();
  const post = await serviceFirestore.readId('posts', postId);
  console.log('Post', post);
  console.log('<< End read post post', Date.now() - startTimeReadPost);

  console.log('>> Init read tags');
  const startTimeReadPostTags = Date.now();
  const tags = await serviceFirestore.readIds('tags', post.tags);
  console.log('Tags', tags);
  console.log('<< End read tags', Date.now() - startTimeReadPostTags);

  console.log('>> Time to read post and tags <<', Date.now() - startTimeReadPost);
}

readTagsOfPost('oxU4fzJbbONApwLpzcbC');