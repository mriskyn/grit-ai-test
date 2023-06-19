const routers = require("express").Router();
const userRoute = require("./user.route");
const libraryRoute = require("./library.route");
const transactionRoute = require("./transaction.route");

routers.use("/users", userRoute);
routers.use("/libraries", libraryRoute);
routers.use("/transactions", transactionRoute);

module.exports = routers;
