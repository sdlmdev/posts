const { Joi, celebrate } = require('celebrate');

const validationPost = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

module.exports = {
  validationPost,
};
