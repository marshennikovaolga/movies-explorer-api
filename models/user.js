const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailRegex, passwordRegex } = require('../utils/constants');
const InvalidCredentialsError = require('../errors/invalidCredentialsError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля - 2'],
    maxlength: [30, 'Максимальная длина поля - 30'],
    required: [true, 'Заполните поле'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Заполните поле'],
    validate: {
      validator(email) {
        return emailRegex.test(email);
      },
      message: 'Введите корректный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Заполните поле'],
    validate: {
      validator(password) {
        return passwordRegex.test(password);
      },
      message: 'Введите корректный пароль',
    },
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidCredentialsError('Ошибка в адресе электронной почты или пароле.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new InvalidCredentialsError('Ошибка в адресе электронной почты или пароле.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
