const Joi = require("joi");

const createtTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
  }),

  description: Joi.string().min(5).max(500).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
    "string.max": "Description must not exceed 500 characters",
  }),

  priority: Joi.string().valid("low", "medium", "high").default("medium").messages({
    "any.only": "Priority must be one of 'low', 'medium', or 'high'",
  }),

  status: Joi.string().valid("pending", "in-progress", "completed").default("pending").messages({
    "any.only": "Status must be 'pending', 'in-progress', or 'completed'",
  }),

  dueDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Due date must be in 'YYYY-MM-DD' format",
      "string.empty": "Due date is required",
    }),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
  }),

  description: Joi.string().min(5).max(500).messages({
    "string.min": "Description must be at least 5 characters",
    "string.max": "Description must not exceed 500 characters",
  }),

  priority: Joi.string().valid("low", "medium", "high").default("medium").messages({
    "any.only": "Priority must be one of 'low', 'medium', or 'high'",
  }),

  status: Joi.string().valid("pending", "in-progress", "completed").default("pending").messages({
    "any.only": "Status must be 'pending', 'in-progress', or 'completed'",
  }),

  dueDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      "string.pattern.base": "Due date must be in 'YYYY-MM-DD' format",
    }),

  userId: Joi.string(),
});

module.exports = { createtTaskSchema, updateTaskSchema };
