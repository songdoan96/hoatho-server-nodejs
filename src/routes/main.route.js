const express = require("express");
const router = express.Router();
const MainController = require("../controllers/main.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
class MainRoute {
  constructor() {
    this.path = "/";
    this.router = router;
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get(`/`, MainController.home);
  }
}

module.exports = new MainRoute();
