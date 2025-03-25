const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Task Manager API",
    description: `
    API for managing tasks and users.
    
    **Authentication Process:**
    - Visit: [Google OAuth Login](http://localhost:8080/api/auth/google)
    - Authenticate and get a token from the response.
    - Click **Authorize** (🔑) in Swagger UI and enter your token as: **Bearer your_auth_token**.
    - Now, all secured endpoints will be accessible.`,
    version: "1.0.0",
  },
  host: "localhost:8080", //"cse341-week03-04.onrender.com", // Change this when deploying
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Users", description: "User management endpoints" },
    { name: "Tasks", description: "Task management endpoints" },
  ],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: `
      **Authentication Required**
      - First, visit: [Google OAuth Login](http://localhost:8080/api/auth/google)
      - Copy the returned token.
      - Click **Authorize** (🔑) at the top and enter: **Bearer your_auth_token**.`,
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

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const fs = require("fs");

  // Load the generated swagger file
  const swaggerData = require("./swagger.json");

  // List of paths to exclude
  const excludePaths = ["/api/auth/google", "/api/auth/google/callback"];

  // Remove unwanted paths
  swaggerData.paths = Object.keys(swaggerData.paths)
    .filter((path) => !excludePaths.includes(path))
    .reduce((filteredPaths, key) => {
      filteredPaths[key] = swaggerData.paths[key];
      return filteredPaths;
    }, {});

  // Write back the filtered Swagger JSON
  fs.writeFileSync(outputFile, JSON.stringify(swaggerData, null, 2));
});
