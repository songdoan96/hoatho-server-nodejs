require("dotenv").config();
const CREDENTIALS = process.env.CREDENTIALS === "true";
const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
const { DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD, DB_URL } = process.env;
module.exports = {
  CREDENTIALS,
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_PASSWORD,
  DB_URL,
};
