const createHttpError = require("http-errors");
const taskService = require("../services/taskService");

// Create a new task
exports.createTask = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Create a new Task'
    #swagger.description = 'Creates a new task detail'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Task details',
      required: true,
      schema: { $ref: '#/definitions/taskInput' }
    }
    #swagger.responses[400] = { description: 'Validation Error' }
    #swagger.responses[404] = { description: 'UserId does not exixt' }
    #swagger.responses[500] = { description: 'Failed to create task' }
  */
  const { title, description, priority, status, dueDate, userId } = req.body;

  try {
    const existingTask = await taskService.findTaskByTitle(title);
    if (existingTask) {
      return next(createHttpError(409, "Task title already exists"));
    }

    const existingUserId = await taskService.findTaskByUserId(userId);
    if (!existingUserId) {
      return next(createHttpError(404, "This UserId does not exist"));
    }

    const data = { title, description, priority, status, dueDate, userId };
    const newTask = await taskService.createNewTask(data);
    if (!newTask) {
      return next(createHttpError(500, "Failed to create new task"));
    }
    return res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Update task by Id'
    #swagger.description = 'Updates an existing task'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Task ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated task details',
      required: true,
      schema: { $ref: '#/definitions/taskInput' }
    }
  */
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(createHttpError(400, "Request body cannot be empty"));
  }

  const id = req.params.id;

  try {
    const updatedTask = await taskService.updateTask(id, req.body);
    if (!updatedTask) {
      throw createHttpError(404, "Task not found");
    }
    return res.json({
      updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Fetch all task details
exports.getAllTasks = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Retrieve all tasks'
    #swagger.description = 'Fetches all stored tasks details from the database.'
    #swagger.responses[200] = {
      description: 'List of tasks retrieved successfully',
      schema: { $ref: '#/definitions/Task' }
    }
    #swagger.responses[404] = { description: 'No task data found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  try {
    const allTasks = await taskService.getAllTask();
    if (!allTasks || allTasks.length === 0) {
      return next(createHttpError(404, "No Task data found"));
    }
    res.json(allTasks);
  } catch (error) {
    next(error);
  }
};

// fetch task by id
exports.getTaskById = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Retrieve a task by ID'
    #swagger.description = 'Fetches task details based on a provided ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the task to retrieve',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Task details retrieved successfully',
      schema: { $ref: '#/definitions/Task' }
    }
    #swagger.responses[404] = { description: 'Task not found' }
    #swagger.responses[500] = { description: 'Failed to fetch task details' }
  */
  const id = req.params.id;
  try {
    const taskDetails = await taskService.getTaskById(id);
    if (!taskDetails) {
      return next(createHttpError(404, "Task not found"));
    }
    res.json(taskDetails);
  } catch (error) {
    next(error);
  }
};

//Delete a task
exports.deleteTask = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Delete a Task'
    #swagger.description = 'Deletes a task from the database based on the provided ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the task to delete',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = { description: 'task deleted successfully' }
    #swagger.responses[404] = { description: 'task not found' }
    #swagger.responses[500] = { description: 'Failed to delete task' }
  */
  const id = req.params.id;
  try {
    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      return next(createHttpError(404, "Task not found"));
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
