const express = require("express");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const sequelize = require("./database/sequelize");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images/profil", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));

app.use(bodyParser.json());

sequelize.initDb();

app.use("/api/user", userRoutes);

module.exports = app;
