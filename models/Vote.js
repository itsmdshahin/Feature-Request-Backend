// backend/models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  featureRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'FeatureRequest', required: true },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
