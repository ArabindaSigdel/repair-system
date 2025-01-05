const express = require("express");
const auth = require("../middlewares/auth");
const addVehicle = require("../controllers/vehicle/addVehicle");
const getVehicle = require("../controllers/vehicle/getVehicle");
const addRepairRequest = require("../controllers/repair/addRepairRequest");

const vehicleRouter = express.Router();

// Apply authentication middleware for all routes
vehicleRouter.use(auth(["Customer"])); // Only customers are allowed for these routes

// Define routes
vehicleRouter.post("/addVehicle", addVehicle);
vehicleRouter.get("/getVehicle", getVehicle);
vehicleRouter.post("/addRepairRequest", addRepairRequest);

module.exports = vehicleRouter;
