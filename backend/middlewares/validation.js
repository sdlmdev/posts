const { Joi, celebrate } = require('celebrate');

const validationPost = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

const validationPostId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationPost,
  validationPostId,
};
