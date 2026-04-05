const mongoose = require('mongoose');

const EvidenceSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    originalName: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Evidence', EvidenceSchema);
