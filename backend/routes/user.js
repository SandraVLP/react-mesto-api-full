const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, patchUserProfile, patchUserAvatar, getUser,
} = require('../controllers/user');

// eslint-disable-next-line no-useless-escape
const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

router.get('/', auth, getUsers);
router.get('/me', auth, getUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
  }),
}), auth, getUserById);
router.patch('/me', celebrate({
  // params: Joi.string().pattern(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, patchUserProfile);
router.patch('/me/avatar', celebrate({
  // params: Joi.string().pattern(),
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(RegExp(urlRegExp)),
  }),
}), auth, patchUserAvatar);

module.exports = router;
