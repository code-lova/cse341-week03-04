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
const authenticateUser = require("../middleware/authMiddleware");

// CRUD Routes with Validation
router.post("/", authenticateUser, validateTask.validateCreateTask, createTask); // Create a task
router.put("/:id", authenticateUser, validateTask.validateUpdateTask, updateTask); // Update task
router.delete("/:id", authenticateUser, deleteTask); // Delete task

router.get("/", authenticateUser, getAllTasks); // Get all tasks
router.get("/:id", authenticateUser, getTaskById); // Get task by ID

module.exports = router;
