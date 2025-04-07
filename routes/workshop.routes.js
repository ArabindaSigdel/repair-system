const express = require("express");
const auth = require("../middlewares/auth");

// Controllers
const workshopRegisterController = require("../controllers/workshop/workshopRegister");
const workshopLoginController = require("../controllers/workshop/workshopLogin");
const getRepairLogController = require("../controllers/workshop/RepairRequest/getAllRepairRequest");
const acceptRepairRequestController = require("../controllers/workshop/RepairRequest/acceptRepairRequest");
const getAcceptedRequestController = require("../controllers/workshop/RepairRequest/getAcceptedRequest");
const addInventoryItemController = require("../controllers/workshop/Inventory/addInventoryItem");
const getInventoryItemsController = require("../controllers/workshop/Inventory/getInventoryItems");
const updateInventoryItemsController = require("../controllers/workshop/Inventory/updateInventoryItems");
const updateInventoryQuantityController = require("../controllers/workshop/Inventory/updateInventoryQuantityController");

const workshopRouter = express.Router();

// Public routes
workshopRouter.post("/register", workshopRegisterController);
workshopRouter.post("/login", workshopLoginController);

// Protected routes (require authentication)
workshopRouter.use(auth(["Workshop"]));

// Repair request routes
workshopRouter.get("/getAllRepairRequest", getRepairLogController);
workshopRouter.post("/acceptRepairRequest", acceptRepairRequestController);
workshopRouter.get("/getAcceptedRequest", getAcceptedRequestController);

// Inventory routes
workshopRouter.post("/addInventoryItem", addInventoryItemController);
workshopRouter.get("/getInventoryItems", getInventoryItemsController);
workshopRouter.post("/updateInventoryItem", updateInventoryItemsController); // Route for updating inventory items
workshopRouter.post(
  "/updateInventoryQuantity",
  updateInventoryQuantityController
); // Route for updating inventory quantity

module.exports = workshopRouter;
