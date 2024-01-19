// backend/controllers/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.send({ error: "User Already Exists!" });
    }


    console.log(username + " " + password);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      req.flash('error', 'Invalid username or password');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Log the username to the console (for debugging purposes)
    console.log(username);

    // Send the token as a response
    return res.status(200).json({ status: "valid user", data: token, id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUser = async (req, res) => {
  const userId = req.params.id; // Retrieve user ID from the request parameters
  try {
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllUser = async (req, res) => { 
  try {
    const allUser = await User.find({});
    
    res.json(allUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { register, login, getUser,getAllUser }; 
