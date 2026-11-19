
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Task Manager API",
    version: "1.0.0",
  });
});

// 2. Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is running",
  });
});

// 3. API Information
app.get("/api/info", (req, res) => {
  res.status(200).json({
    success: true,
    name: "Task Manager API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// 4. Server Status
app.get("/api/status", (req, res) => {
  res.status(200).json({
    success: true,
    server: "Online",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 5. API Features
app.get("/api/features", (req, res) => {
  res.status(200).json({
    success: true,
    features: [
      "Create Tasks",
      "View Tasks",
      "Update Tasks",
      "Delete Tasks",
      "Task Management",
    ],
  });
});

// Task Routes
app.use("/api/tasks", taskRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("--------------------------------");
  console.log("Task Manager API Started");
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("--------------------------------");
});
