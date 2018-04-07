const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobPostSchema = new Schema({
    _employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer'
    },
    position: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true  
    },
    province: {
        type: String,
        required: true  
    },
    schedule: {
        type: String,
        required: true  
    },
    skills: {
        type: [String],
        required: true  
    },
    description: {
        type: String,
        required: true  
    },
    applyThrough: {
        type: String,
        required: true  
    },
    internal: String,
    external: String,
    salary: {
        from: Number,
        to: Number,
        paymentCycle: String
    },
    questions: [
        {
            question: String,
            choices: [String]
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const ModelClass = mongoose.model('JobPost', jobPostSchema);

module.exports = ModelClass;
