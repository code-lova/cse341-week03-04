const createHttpError = require("http-errors");

const notFound = (req, res, next) => {
  next(createHttpError(404, `Route ${req.originalUrl} does not exist on this server`));
};

module.exports = notFound;
