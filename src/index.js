const App = require("./app");
const routes = require("./routes");
const app = new App(routes);
app.listen();
