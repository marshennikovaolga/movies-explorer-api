const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { addUser } = require('../controllers/users');
const { emailRegex } = require('../utils/constants');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
  }),
}), addUser);

module.exports = router;
