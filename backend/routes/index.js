const router = require('express').Router();
const postsRouter = require('./posts');
const NotFoundError = require('../errors/NotFoundError');

router.use('/posts', postsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес не найден.'));
});

module.exports = router;
