require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorhandling = require('./error/error-handling.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');   
const authRoutes = require('./routes/auth.js');
const featureRequestRoutes = require('./routes/featureRequest.js');
const commentRoutes = require('./routes/comment.js');
const voteRoutes = require('./routes/vote.js');

const connectDB = require('./database/db.js'); 

// connect mongodb
connectDB();


const app = express();

// middleware 
app.use(cors(
    // {
    //     origin:["https://feature-requests-appss.vercel.app"],
    //     methods:["POST", "GET"],
    //     credentials: true
    // }
));
app.use(bodyParser.json());


// Routes
app.use('/auth', authRoutes);
app.use('/feature-requests', featureRequestRoutes);
app.use('/comments', commentRoutes);
app.use('/votes', voteRoutes); 


app.use(errorhandling);

const PORT = process.env.PORT || 8080;
const backendURL = process.env.backendURL || 'http://localhost:'
// app.use('/api/feature', router);


app.listen(PORT, ()=>{
    console.log(`Server is Running ${backendURL}${PORT}`);
})