const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const connectDB = require("./config/db");
const tasksRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API! Go to /api-docs for documentation.");
});
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // Add OAuth routes

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle undefined routes (404)
app.use(notFound);

//Global Error Handler Middleware
app.use(errorHandler);

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
