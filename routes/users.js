const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get back all posts
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// Specific post
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete specific post
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await Post.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update specific post
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await Post.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        },
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
