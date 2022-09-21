const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

module.exports.validateMovieId = celebrate({
  body: Joi.object().keys({
    mivieId: Joi.string().length(24).hex().required(),
  })
});

module.exports.validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if(isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный формат ссылки');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if(isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный формат ссылки');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if(isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный формат ссылки');
    }),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
