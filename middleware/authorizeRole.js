const createHttpError = require("http-errors");

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createHttpError(401, "Unauthorized: You must be logged in."));
    }

    if (req.user.role !== requiredRole) {
      return next(createHttpError(403, "Forbidden: You do not have the required permissions."));
    }

    next();
  };
};

module.exports = authorizeRole;
