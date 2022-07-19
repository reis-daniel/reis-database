const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Auth0
const { auth } = require("express-openid-connect");
// Cors package so that we can fetch data from frontend site
const cors = require("cors");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASEURL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASEURL,
};

// Middlewares
app.use(cors());
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Import dotenv-config
require("dotenv/config");

app.use(bodyParser.json());

// Import Routes
const usersRoute = require("./routes/users");
const sessionsRoute = require("./routes/sessions");

// Middlewares
app.use("/users", usersRoute);
app.use("/sessions", sessionsRoute);

// Routes
// req.isAuthenticated is provided from the auth router
app
  .get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  })
  .get("/callback", (req, res) => {
    res.send("Test");
  });

// .get() shoots back a message
//app.get("/", (req, res) => {
//  res.send("We are live on heroku!");
//});

// Connect to DB (mongodb)
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB!");
});

// How to start listening to the server -> port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("You are connected!");
});
