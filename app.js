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

// Import routers
const userRouter = require("./routes/user.routes");
const vehicleRouter = require("./routes/vehicle.routes");
const adminRouter = require("./routes/adminUser.routes");

// Use routes
app.use("/api/users", userRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/admin", adminRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
