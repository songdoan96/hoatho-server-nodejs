class UserController {
  getAll(req, res, next) {
    res.json("hello");
  }
}
module.exports = new UserController();
