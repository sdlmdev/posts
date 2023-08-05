const postsRouter = require('express').Router();
const { getPosts, createPost } = require('../controllers/posts');
const { validationPost } = require('../middlewares/validation');
// const posts = require('../utils/postsList');

postsRouter.get('/posts', getPosts);
postsRouter.post('/posts', validationPost, createPost);

module.exports = postsRouter;
