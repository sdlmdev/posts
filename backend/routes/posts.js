const postsRouter = require('express').Router();

const posts = require('../utils/postsList');

postsRouter.get('/', (req, res, next) => {
  try {
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

module.exports = postsRouter;
