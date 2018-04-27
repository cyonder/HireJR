const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobApplicationSchema = new Schema({
    _candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    _employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer'
    },
    _jobPostId: {
        type: Schema.Types.ObjectId,
        ref: 'JobPost'
    },
    questions: [
        {
            question: String,
            answer: String
        }
    ]
}, {
    timestamps: true
});

const ModelClass = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = ModelClass;
