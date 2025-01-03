const express = require("express");
const auth = require("../middlewares/auth");
const addVehicle = require("../controllers/vehicle/addVehicle");
const getVehicle = require("../controllers/vehicle/getVehicle");

const vehicleRouter = express.Router();

vehicleRouter.use(auth);
vehicleRouter.post("/addVehicle", addVehicle);
vehicleRouter.get("/getVehicle", getVehicle);

module.exports = vehicleRouter;
