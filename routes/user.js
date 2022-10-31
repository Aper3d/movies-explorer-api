const router = require('express').Router();
const { validateUserInfo } = require('../middlewares/validation');
const { getMe, updateUser } = require('../controllers/user');

router.get('/users/me', getMe);

router.patch('/users/me', validateUserInfo, updateUser);

module.exports = router;
