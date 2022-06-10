if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const routes = require("./routes");
const cors = require('cors')
const path = require('path')
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.use(express.static(path.join(__dirname, '/client/build')))

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

// serve static files

app.use(errorHandler);

module.exports = app;
