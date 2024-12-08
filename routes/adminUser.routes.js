const express = require("express");
const adminRouter = express.Router();
const adminRegister = require("../controllers/admin/user/adminRegister");

adminRouter.post("/registerAdmin", adminRegister);

module.exports = adminRouter;
