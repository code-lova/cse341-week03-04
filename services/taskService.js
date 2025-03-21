const Task = require("../models/Task");

// Create a new contact
const createNewTask = async (data) => {
  return await Task.create(data);
};

// Find task by userId
const findTaskByUserId = async (userId) => {
  return await Task.findOne({ userId });
};

//Find task by title
const findTaskByTitle = async (title) => {
  return await Task.findOne({ title });
};

//Update a task by id and it body
const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

// Fetch all Task
const getAllTask = async () => {
  return await Task.find();
};

// get a Task by Id
const getTaskById = async (id) => {
  return await Task.findById(id);
};

// Delete a Task
const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = {
  createNewTask,
  findTaskByUserId,
  findTaskByTitle,
  updateTask,
  getAllTask,
  getTaskById,
  deleteTask,
};
