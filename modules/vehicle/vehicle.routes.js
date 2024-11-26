const express = require("express");
const auth = require("../../middlewares/auth");
const addVehicle = require("./controllers/addVehicle");
const { model } = require("mongoose");

const vehicleRouter = express.Router();

vehicleRouter.use(auth);
vehicleRouter.post("/addVehicle", addVehicle);

module.exports = vehicleRouter;
