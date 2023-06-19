const routers = require("express").Router();
const { register, login } = require("../controllers/user.controller");
const { userValidator, checkPassword } = require("../middlewares/validator");

routers.post("/register", userValidator(),checkPassword,register);
routers.post("/login", login);

module.exports = routers;
