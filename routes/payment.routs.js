const paymentRouter = require("express").Router();
const KhaltiCallback = require("../controllers/payment/khaltiCallBack");
const KhaltiPayment = require("../controllers/payment/khaltiPayment");
const getBill = require("../controllers/payment/getBill"); // Import the getBill controller
const auth = require("../middlewares/auth");

// Khalti callback route
paymentRouter.get("/khaltiCallback", KhaltiCallback);

// Khalti payment route
paymentRouter.post("/khaltiPayment", auth(["Customer"]), KhaltiPayment);

// Get bill route
paymentRouter.get("/getBill/", auth(["Customer"]), getBill);

module.exports = paymentRouter;
