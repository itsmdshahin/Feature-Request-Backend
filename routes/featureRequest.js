// backend/routes/featureRequest.js
const express = require('express');
const featureRequestController = require('../controllers/featureRequest.js');
const featureRequest = express.Router();

featureRequest.post('/', featureRequestController.createFeatureRequest);
featureRequest.get('/', featureRequestController.getFeatureRequests);
featureRequest.put('/:id', featureRequestController.putFeatureRequests);
featureRequest.put('/updateStatus/:id', featureRequestController.putFeatureRequestss);
featureRequest.delete('/delete/:id', featureRequestController.deleteFeatureRequest);


module.exports = featureRequest;
