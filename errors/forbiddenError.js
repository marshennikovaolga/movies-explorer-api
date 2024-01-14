class ForbiddenError extends Error {
  constructor(message = 'Вы не можете удалить фильм другого пользователя.') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
