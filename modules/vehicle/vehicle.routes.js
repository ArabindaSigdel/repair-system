const express = require("express");
const auth = require("../../middlewares/auth");
const addVehicle = require("./controllers/addVehicle");
const { model } = require("mongoose");
const getVehicle = require("./controllers/getVehicle");

const vehicleRouter = express.Router();

vehicleRouter.use(auth);
vehicleRouter.post("/addVehicle", addVehicle);
vehicleRouter.get("/getVehicle", getVehicle);

module.exports = vehicleRouter;
