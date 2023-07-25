const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rank: { type: Number, default: 1 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  // Add more fields as needed
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
