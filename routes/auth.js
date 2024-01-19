// backend/routes/auth.js
const express = require('express');
const authController = require('../controllers/auth');
const auth = express.Router();

auth.post('/register', authController.register);
auth.post('/login', authController.login);
auth.get('/getUser/:id', authController.getUser);
auth.get('/getUser', authController.getAllUser); // Corrected route with ':id' parameter
module.exports = auth;
