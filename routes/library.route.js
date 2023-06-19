const routers = require("express").Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/library.controller");
const { authentication, authorization } = require("../middlewares/auth");

routers.use(authentication, authorization("admin"));
routers.get("/", getAll);
routers.post("/", create);
routers.get("/:id", getById);
routers.put("/:id", update);
routers.delete("/:id", remove);

module.exports = routers;
