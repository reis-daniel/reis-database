const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Sessions = require("../models/Session");

// Routes
// Get all sessions from database
router.get("/", async (req, res) => {
  try {
    const sessions = await Sessions.find();
    res.json(sessions);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
