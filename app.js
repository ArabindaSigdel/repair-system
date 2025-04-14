const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors"); // For console styling
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

// Middleware to parse incoming JSON
app.use(express.json());

// Import routers
const userRouter = require("./routes/user.routes");
const vehicleRouter = require("./routes/vehicle.routes");
const adminRouter = require("./routes/adminUser.routes");
const workshopRouter = require("./routes/workshop.routes");
const paymentRouter = require("./routes/payment.routs");

// Use routes
app.use("/api/users", userRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/admin", adminRouter);
app.use("/api/workshop", workshopRouter);
app.use("/api/payment", paymentRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
