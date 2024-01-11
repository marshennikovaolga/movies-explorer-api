const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const process = require('process');

const { JWT_KEY = 'diploma-key' } = process.env;
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

const User = require('../models/user');

module.exports.getMyId = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.editUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError());
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError());
      } else {
        next(err);
      }
    });
};

module.exports.addUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};
