const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();
const validateTask = require("../middleware/taskValidator");

// CRUD Routes with Validation
router.post("/", validateTask.validateCreateTask, createTask); // Create a task
router.put("/:id", validateTask.validateUpdateTask, updateTask); // Update task

router.get("/", getAllTasks); // Get all tasks
router.get("/:id", getTaskById); // Get task by ID
router.delete("/:id", deleteTask); // Delete task

module.exports = router;
