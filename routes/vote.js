// backend/routes/vote.js
const express = require('express');
const voteController = require('../controllers/vote');
const vote = express.Router();

vote.post('/', voteController.voteFeatureRequest);

module.exports = vote;
