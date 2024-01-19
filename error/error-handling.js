
const express = require('express');
const errorhandling = express.Router();

// default message for server
errorhandling.use('/', (req,res)=>{
    res.status(200).json({
        message: "Welcome to Featur Request Board!",
    })
});

// server error handling
errorhandling.use((err, req, res, next) => {
    res.status(500).json({
        message: "Somthing Error in your server found !",
    })
});

errorhandling.use((req, res, next) => {
    res.status(404).json({
      message: "Route not Found!",
    })
  });


module.exports = errorhandling;
  