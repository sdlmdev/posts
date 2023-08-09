const postsRouter = require('express').Router();
const { getPosts, createPost, deletePost } = require('../controllers/posts');
const { validationPost, validationPostId } = require('../middlewares/validation');

postsRouter.get('/', getPosts);
postsRouter.post('/', validationPost, createPost);
postsRouter.delete('/:id', validationPostId, deletePost);

module.exports = postsRouter;
