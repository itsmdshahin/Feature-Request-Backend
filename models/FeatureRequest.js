const mongoose = require('mongoose'); 

const featureSchemas = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    vote: {
        type: Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model (assuming you have a User model)
        },
    ],
    author: {
        type: String,
        // require: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    dueDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("FeatureRequest", featureSchemas);