const express = require("express");
const workshopRegisterController = require("../controllers/workshop/workshopRegister");
const workshopLoginController = require("../controllers/workshop/workshopLogin");
const auth = require("../middlewares/auth");
const getRepairLogController = require("../controllers/workshop/getAllRepairRequest");
const acceptRepairRequestController = require("../controllers/workshop/acceptRepairRequest");
const getAcceptedRequestController = require("../controllers/workshop/getAcceptedRequest");
const workshopRouter = express.Router();

workshopRouter.post("/register", workshopRegisterController);
workshopRouter.post("/login", workshopLoginController);

workshopRouter.use(auth(["Workshop"]));
workshopRouter.get("/getAllRepairRequest", getRepairLogController);
workshopRouter.post("/acceptRepairRequest", acceptRepairRequestController);
workshopRouter.get("/getAcceptedRequest", getAcceptedRequestController);
module.exports = workshopRouter;
