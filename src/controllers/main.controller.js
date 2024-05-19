class MainController {
  home = (req, res, next) => {
    res.render("home");
  };
}
module.exports = new MainController();
