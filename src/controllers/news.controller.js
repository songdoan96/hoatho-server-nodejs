const Pusher = require("pusher");
const NewsModel = require("../models/news.model");

class NewsController {
  async all(req, res, next) {
    const news = await NewsModel.find();
    return res.json({
      data: news,
    });
  }
  async add(req, res, next) {
    const { title, content } = req.body;
    const news = new NewsModel({ title, content });
    await news.save();
    return res.json(news);
  }
  async get(req, res, next) {
    const { id } = req.params;
    const news = await NewsModel.findById(id);
    return res.json({
      data: news,
    });
  }
}
module.exports = new NewsController();
