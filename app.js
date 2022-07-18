const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Cors package so that we can fetch data from frontend site
const cors = require("cors");

// Middlewares
app.use(cors());

// Import dotenv-config
require("dotenv/config");

app.use(bodyParser.json());

// Import Routes
const usersRoute = require("./routes/users");

// Middlewares
app.use("/users", usersRoute);

// Routes
// .get() shoots back a message
app.get("/", (req, res) => {
  res.send("We are live on heroku!");
});

// Connect to DB (mongodb)
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB!");
});

// How to start listening to the server -> port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("You are connected!");
});
