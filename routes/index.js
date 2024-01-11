const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const NotFoundError = require('../errors/notFoundError');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
