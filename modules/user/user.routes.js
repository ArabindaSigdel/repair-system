const userLogin = require("./controllers/userLogin");
const userRegister = require("./controllers/userRegister");

const express = require("express");

const userRouter = express.Router();
userRouter.post("/registerUser", userRegister);
userRouter.post("/login", userLogin);

module.exports = userRouter;
