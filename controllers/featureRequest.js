// backend/controllers/featureRequest.js
const FeatureRequest = require('../models/FeatureRequest');

const createFeatureRequest = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new feature request
    const newFeatureRequest = new FeatureRequest({ title, description });

    // Save the feature request to the database
    await newFeatureRequest.save();

    res.status(201).json({ message: 'Feature request created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getFeatureRequests = async (req, res) => {
  try {
    const { sort, search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const sortOptions = {
      lowestVote: { vote: 1 },
      highestVote: { vote: -1 },
      oldest: { createdAt: 1 },
      newest: { createdAt: -1 },
      aToZ: { title: 1 },
      zToA: { title: -1 },
      successful: { status: 'success' },
      pending: { status: 'pending' },
    };

    const featureRequests = await FeatureRequest.find(query).sort(sortOptions[sort]);

    res.json(featureRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const putFeatureRequestss = async (req, res) => {
  try {
    const { featureRequestId, status } = req.body;

    // Find the feature request to update
    const featureRequest = await FeatureRequest.findByIdAndUpdate(
      featureRequestId,
      { $set: { status } },
      { new: true } // Return the updated document
    );

    if (!featureRequest) {
      return res.status(404).json({ message: 'Feature request not found' });
    }

    res.status(200).json({ message: 'Feature request updated successfully', updatedFeatureRequest: featureRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const putFeatureRequests = async (req, res) => {
  try {
    const { featureRequestId, vote } = req.body;

    // Find the feature request to update
    const featureRequest = await FeatureRequest.findByIdAndUpdate(
      featureRequestId,
      { $set: { vote } },
      { new: true } // Return the updated document
    );

    if (!featureRequest) {
      return res.status(404).json({ message: 'Feature request not found' });
    }

    res.status(200).json({ message: 'Feature request updated successfully', updatedFeatureRequest: featureRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFeatureRequest = async (req, res) => {
  try {
    const { featureRequestId } = req.params;

    // Find and delete the feature request
    const deletedFeatureRequest = await FeatureRequest.findByIdAndDelete(featureRequestId);

    if (!deletedFeatureRequest) {
      return res.status(404).json({ message: 'Feature request not found' });
    }

    res.status(200).json({ message: 'Feature request deleted successfully', deletedFeatureRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createFeatureRequest,deleteFeatureRequest, getFeatureRequests, putFeatureRequests, putFeatureRequestss };
