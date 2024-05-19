const express = require("express");
const { PORT, ORIGIN, CREDENTIALS } = require("./config");
const { dbConnection } = require("./database");
const cors = require("cors");
const ErrorMiddleware = require("./middlewares/error.middleware");
const path = require("path");
const { engine } = require("express-handlebars");

class App {
  constructor(routes) {
    this.app = express();
    this.port = PORT || 3000;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }
  async connectToDatabase() {
    await dbConnection();
  }
  initializeMiddlewares() {
    // this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(require("morgan")("combined"));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.engine(".hbs", engine({ extname: ".hbs" }));
    this.app.set("view engine", ".hbs");
    this.app.set("views", "./src/views");
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cookieParser());
  }
  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
  initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port http://localhost:${this.port}`);
    });
  }
}
module.exports = App;
