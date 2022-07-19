const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// Routes
// Get all sessions from database
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    res.json({ message: error });
  }
});
// Post session to db
router.post("/", async (req, res) => {
  const session = new Session({
    name: req.body.name,
    users: req.body.users,
    scoreboard: req.body.scoreboard,
  });
  try {
    const savedSession = await session.save();
    res.json(savedSession);
  } catch (error) {
    res.json({ message: error });
  }
});
// Get specific session
router.get("/:sessionId", async (req, res) => {
  try {
    const session = await User.findById(req.params.sessionId);
    res.json(session);
  } catch (error) {
    res.json({ message: error });
  }
});
// Delete specific session
router.delete("/:sessionId", async (req, res) => {
  try {
    const removedSession = await Session.remove({ _id: req.params.sessionId });
    res.json(removedSession);
  } catch (error) {
    res.json({ message: error });
  }
});
// Update specific session
router.patch("/:sessionId", async (req, res) => {
  try {
    const updatedSession = await Session.updateOne(
      {
        _id: req.params.sessionId,
      },
      {
        $set: {
          name: req.body.name,
          users: req.body.users,
          scoreboard: req.body.scoreboard,
        },
      }
    );
    res.json(updatedSession);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
