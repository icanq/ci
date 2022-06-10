if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const routes = require("./routes");
const cors = require('cors')
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

app.use(errorHandler);

module.exports = app;
