const paymentRouter = require("express").Router();
const KhaltiCallback = require("../controllers/payment/khaltiCallBack");
const KhaltiPayment = require("../controllers/payment/khaltiPayment");
const auth = require("../middlewares/auth");

paymentRouter.get("/khaltiCallback", KhaltiCallback);

paymentRouter.post("/khaltiPayment", auth(["Customer"]), KhaltiPayment);

module.exports = paymentRouter;
