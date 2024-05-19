const express = require("express");
const router = express.Router();
const SupportController = require("../controllers/support.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
class SupportRoute {
  constructor() {
    this.path = "/support";
    this.router = router;
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get("/all", AuthMiddleware, SupportController.all);
    this.router.get("/get", AuthMiddleware, SupportController.get);
    this.router.post("/add", AuthMiddleware, SupportController.add);
  }
}

module.exports = new SupportRoute();
