const Pusher = require("pusher");
const SupportModel = require("../models/support.model");
const pusher = new Pusher({
  appId: "1755229",
  key: "7003229a99691c0e84cf",
  secret: "f86530cedb344a9429f9",
  cluster: "ap1",
  useTLS: true,
});

class SupportController {
  async all(req, res, next) {
    const supports = await SupportModel.find();
    return res.json(supports);
  }
  async add(req, res, next) {
    const { line, help, user_id, group } = req.body;
    const support = new SupportModel({ line, help, group, user_id });
    await support.save();
    const supports = await SupportModel.find({ user_id });
    pusher.trigger("my-channel", "my-event", {
      message: "hello world",
    });

    return res.json(supports);
  }
  async get(req, res, next) {
    const { user_id } = req.query;
    const support = await SupportModel.find({ user_id });
    return res.json(support);
  }
}
module.exports = new SupportController();
