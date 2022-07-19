const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    userA: {
      userId: String,
      points: Number,
    },
    userB: {
      userId: String,
      points: Number,
    },
  },
  scoreboard: {
    scores: [
      {
        round: Number,
        score: {
          pointsUserA: Number,
          pointsUserB: Number,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Session", SessionSchema);
