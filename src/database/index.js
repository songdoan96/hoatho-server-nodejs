const { DB_DATABASE, DB_HOST, DB_PORT, DB_URL } = require("../config");

const mongoose = require("mongoose");

async function dbConnection() {
  const dbConfig = {
    url: DB_URL ?? `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    options: {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    },
  };
  await mongoose.connect(dbConfig.url, dbConfig.options);
}
module.exports = { dbConnection };
