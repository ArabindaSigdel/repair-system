const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors"); // For console styling
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Import routes
const userRoutes = require("./modules/user/user.routes");
const vehicleRoutes = require("./modules/vehicle/vehicle.routes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
