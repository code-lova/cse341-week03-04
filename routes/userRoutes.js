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

/**
 * @route POST /api/users/register
 * @desc Register a new user
 */
router.post("/register", validateUser.validateCreateUser, registerUser);

/**
 * @route PUT /api/users/update/:id
 * @desc update a user by id
 */
router.put("/update/:id", validateUser.validateUpdateUser, updateUser);

/**
 * @route GET /api/users
 * @desc Get all users
 */
router.get("/", getUsers);

/**
 * @route GET /api/users/:id
 * @desc Get a user by ID
 */
router.get("/:id", getUserById);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID
 */
router.delete("/:id", deleteUser);

module.exports = router;
