const mongoose = require('mongoose');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailerLink,
    thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError();
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError();
      }
      return Movie.deleteOne(movie).orFail();
    })
    .then(() => {
      res.status(200).send({ message: 'Фильм успешно удалён из списка.' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError());
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};
