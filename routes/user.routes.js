const userLogin = require("../controllers/user/userLogin");
const userRegister = require("../controllers/user/userRegister");

const express = require("express");

const userRouter = express.Router();
userRouter.post("/registerUser", userRegister);
userRouter.post("/login", userLogin);

module.exports = userRouter;
