const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  director: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Заполните поле'],
  },
  year: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  description: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  image: {
    type: String,
    required: [true, 'Заполните поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Введите корректный URL.',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Заполните поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Введите корректный URL.',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Заполните поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Введите корректный URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movield: {
    type: Number,
    required: [true, 'Заполните поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Заполните поле'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
