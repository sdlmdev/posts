const mongoose = require('mongoose');
const Post = require('../models/post');
const BadRequestError = require('../errors/BadRequestError');

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

module.exports = {
  getPosts,
  createPost,
};
