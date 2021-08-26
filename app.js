const express = require('express');
const app = express();
const morgan = require('morgan');
//use morgan
app.use(morgan("dev"));
// process the json data
app.use(express.json());

// monogDB
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL)
  .then(console.log("DB is connected"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });
// http:localhost:5001/users
/*const users = require("./router/users");
app.use("/users", users);*/

app.get("/", (req, res) => {
  res.status(200).send("Welcome to our app");
});

module.exports = app;

