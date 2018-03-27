const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobApplicationSchema = new Schema({
    _candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'JobApplication'
    },
    _employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer'
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
