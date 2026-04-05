const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a case title']
    },
    type: {
        type: String,
        required: [true, 'Please select an incident type'],
        enum: ['Harassment', 'Assault', 'Discrimination', 'Domestic Violence', 'Other']
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Please provide a description of what happened']
    },
    involvedParties: {
        type: String
    },
    additionalDetails: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Case', CaseSchema);
