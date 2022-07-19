const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Auth0
const { auth } = require("express-openid-connect");
// Cors package so that we can fetch data from frontend site
const cors = require("cors");
require("dotenv/config");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASEURL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASEURL,
};

const app = express();

app.use(cors());
app.use(bodyParser.json());

//app.use(auth(config));

const usersRoute = require("./routes/users");
const sessionsRoute = require("./routes/sessions");
app.use("/users", usersRoute);
app.use("/sessions", sessionsRoute);

app.get("/", (req, res) => {
  res.send("We are live.");
});

// req.isAuthenticated is provided from the auth router
/*
app.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});


app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
*/

// Connect to DB (mongodb)
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB!");
});

// How to start listening to the server -> port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("You are connected!");
});
