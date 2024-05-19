const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
class AuthRoute {
  constructor() {
    this.path = "/auth";
    this.router = router;
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(`/login`, AuthController.login);
    this.router.post(`/register`, AuthController.register);
    this.router.post(`/logout`, AuthMiddleware, AuthController.logout);
  }
}

module.exports = new AuthRoute();
