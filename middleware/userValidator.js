const UserSchema = require("../helper/userValidationSchema");
const createHttpError = require("http-errors");

const validateCreateUser = (req, res, next) => {
  const { error } = UserSchema.createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { error } = UserSchema.updateUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

module.exports = { validateCreateUser, validateUpdateUser };
