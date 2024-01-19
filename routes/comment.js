// backend/routes/comment.js
const express = require('express');
const commentController = require('../controllers/comment.js');
const comment = express.Router();

comment.post('/', commentController.createComment);

module.exports = comment;
