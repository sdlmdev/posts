const mongoose = require('mongoose');
const Post = require('../models/post');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});

    res.send(posts);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    // const newPost = await Post.create({ ...req.body, owner: req.user._id });
    const newPost = await Post.create({ ...req.body });

    res.status(201).send(newPost);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании поста.'));
    } else {
      next(err);
    }
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new NotFoundError('Пост с указанным _id не найден.');
    }

    // if (post.owner.toString() !== req.user._id) {
    //   throw new ForbiddenError('Нельзя удалить чужой пост.');
    // }

    await Post.deleteOne(post);

    res.send(post);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new BadRequestError('Переданы некорректные данные.');
    } else {
      next(err);
    }
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
};
