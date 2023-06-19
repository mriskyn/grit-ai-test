const {
  getAll,
  updateReturn,
  create,
} = require("../controllers/transaction.controller");
const { authentication, authorization } = require("../middlewares/auth");

const routers = require("express").Router();

routers.use(authentication);
routers.get("/", authorization("admin"), getAll);
routers.post("/", authorization("user"), create);
routers.patch("/:id/return", authorization("user"), updateReturn);

module.exports = routers;
