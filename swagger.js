const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Task Manager API",
    description: "API for managing tasks and users",
    version: "1.0.0",
  },
  host: "cse341-week03-04.onrender.com", // Change this when deploying
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Users", description: "User management endpoints" },
    { name: "Tasks", description: "Task management endpoints" },
  ],
  definitions: {
    User: {
      id: "12345673884495",
      name: "John",
      email: "johndoe@example.com",
      role: "user",
      createdAt: "2025-03-17T10:05:00Z",
      updatedAt: "2025-03-18T15:02:59.926Z",
      __v: 0,
    },
    UserInput: {
      name: "Jane Matther",
      email: "janesmith@example.com",
      password: "123456",
      role: "user",
    },
    Task: {
      userId: "123664849955",
      title: "new task",
      description: "how to make it",
      status: "pending",
      priority: "medium",
      dueDate: "2025-04-05",
      createdAt: "2025-03-17T10:05:00Z",
      updatedAt: "2025-03-18T13:32:46.952Z",
      __v: 0,
    },
    taskInput: {
      userId: "12345678893930hbs89",
      title: "new task",
      description: "how to make it",
      status: "pending",
      priority: "medium",
      dueDate: "2025-04-21",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
