const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyId, editUserData } = require('../controllers/users');
const { emailRegex } = require('../utils/constants');

router.get('/me', getMyId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(emailRegex).required(),
  }),
}), editUserData);

module.exports = router;

// # возвращает информацию о пользователе (email и имя)
// GET /users/me
// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
