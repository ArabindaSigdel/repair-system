const express = require("express");
const workshopRegisterController = require("../controllers/workshop/workshopRegister");
const workshopLoginController = require("../controllers/workshop/workshopLogin");
const workshopRouter = express.Router();

workshopRouter.post("/register", workshopRegisterController);
workshopRouter.post("/login", workshopLoginController);

module.exports = workshopRouter;
