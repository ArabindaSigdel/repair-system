const express = require("express");
const adminRouter = express.Router();
const adminRegister = require("../controllers/admin/user/adminRegister");
const adminLoginController = require("../controllers/admin/user/adminLogin");

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLoginController);

module.exports = adminRouter;
