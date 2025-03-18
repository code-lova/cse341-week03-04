const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register a new user
const createUser = async ({ name, email, password, role }) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return await User.create(newUser);
};

//Update a user by id and it body
const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// Find a user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Get all users
const getUsers = async () => {
  return await User.find().select("-password"); // Exclude password field
};

// Get user by ID
const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

// Delete user by ID
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = { createUser, findUserByEmail, getUsers, getUserById, updateUser, deleteUser };
