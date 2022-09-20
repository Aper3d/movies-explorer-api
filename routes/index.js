const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/user');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.use(auth);

router.use('/', require('./user'));
router.use('/', require('./movie'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Не правильный путь'));
});

module.exports = router;
