const createHttpError = require("http-errors");

const notFound = (req, res, next) => {
  next(createHttpError(404, `Route ${req.originalUrl} not found`));
};

module.exports = notFound;
