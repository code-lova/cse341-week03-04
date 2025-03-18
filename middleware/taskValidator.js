const taskSchema = require("../helper/taskValidationSchema");
const createHttpError = require("http-errors");

const validateCreateTask = (req, res, next) => {
  const { error } = taskSchema.createtTaskSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

const validateUpdateTask = (req, res, next) => {
  const { error } = taskSchema.updateTaskSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

module.exports = { validateCreateTask, validateUpdateTask };
