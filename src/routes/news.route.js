const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/news.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
class NewsRoute {
  constructor() {
    this.path = "/news";
    this.router = router;
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get("/all", AuthMiddleware, NewsController.all);
    this.router.get("/get/:id", AuthMiddleware, NewsController.get);
    this.router.post("/add", NewsController.add);
  }
}

module.exports = new NewsRoute();
