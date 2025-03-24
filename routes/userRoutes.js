const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const validateUser = require("../middleware/userValidator");
const authorizeRole = require("../middleware/authorizeRole");
const authenticateUser = require("../middleware/authMiddleware");

/**
 * @route POST /api/users/register
 * @desc Register a new user (admin only)
 */
router.post(
  "/register",
  authenticateUser,
  authorizeRole("admin"),
  validateUser.validateCreateUser,
  registerUser
);

/**
 * @route PUT /api/users/update/:id
 * @desc update a user by id (Accessible to all logged-in users)
 */
router.put("/update/:id", authenticateUser, validateUser.validateUpdateUser, updateUser);

/**
 * @route GET /api/users
 * @desc Get all users (Admin only)
 */
router.get("/", authenticateUser, authorizeRole("admin"), getUsers);

/**
 * @route GET /api/users/:id
 * @desc Get a user by ID (Admin only)
 */
router.get("/:id", authenticateUser, authorizeRole("admin"), getUserById);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID (Admin only)
 */
router.delete("/:id", authenticateUser, authorizeRole("admin"), deleteUser);

module.exports = router;
