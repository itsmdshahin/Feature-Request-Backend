// backend/controllers/comment.js
const Comment = require('../models/Comment');
const FeatureRequest = require('../models/FeatureRequest');

const createComment = async (req, res) => {
  try {
    const { text, featureRequestId } = req.body;

    // Create a new comment
    const newComment = new Comment({ text, user: req.userId });

    // Save the comment to the database
    await newComment.save();

    // Add the comment to the associated feature request
    const featureRequest = await FeatureRequest.findById(featureRequestId);
    featureRequest.comments.push(newComment);
    await featureRequest.save();

    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createComment };
