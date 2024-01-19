// backend/controllers/vote.js
const Vote = require('../models/Vote');
const FeatureRequest = require('../models/FeatureRequest');

const voteFeatureRequest = async (req, res) => {
  try {
    const { featureRequestId } = req.body;

    // Check if the user has already voted for this feature request
    const existingVote = await Vote.findOne({ user: req.userId, featureRequest: featureRequestId });

    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted for this feature request' });
    }

    // Create a new vote
    const newVote = new Vote({ user: req.userId, featureRequest: featureRequestId });

    // Save the vote to the database
    await newVote.save();

    // Increment the vote count in the associated feature request
    const featureRequest = await FeatureRequest.findById(featureRequestId);
    featureRequest.votes += 1;
    await featureRequest.save();

    res.status(201).json({ message: 'Vote added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { voteFeatureRequest };
