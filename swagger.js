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
  securityDefinitions: {
    OAuth2: {
      type: "oauth2",
      description: "Google OAuth2 authentication",
      flow: "implicit",
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
      scopes: {
        openid: "Authenticate with Google",
        email: "Access user's email",
        profile: "Access user's profile",
      },
    },
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT token in the format: Bearer <token>",
    },
  },
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
      role: "user",
    },
    Task: {
      userId: "123664849955",
      title: "new task",
      description: "how to make it",
      status: "in-progress",
      priority: "medium",
      dueDate: "2025-04-05",
      createdAt: "2025-03-17T10:05:00Z",
      updatedAt: "2025-03-18T13:32:46.952Z",
      __v: 0,
    },
    taskInput: {
      title: "new task",
      description: "how to make it",
      status: "pending",
      priority: "high",
      dueDate: "2025-04-21",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
