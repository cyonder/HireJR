const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobPostSchema = new Schema({
    position: String,
    city: String,
    province: String,
    schedule: String,
    skills: [String],
    applyThrough: String,
    internal: String,
    external: String,
    isActive: {
        type: Boolean,
        default: true
    },
    salary: {
        from: Number,
        to: Number,
        paymentCycle: String
    },
    description: String,
    questions: [
        {
            question: String,
            choices: [String]
        }
    ]
}, {
    timestamps: true
});

const ModelClass = mongoose.model('JobPost', jobPostSchema);

module.exports = ModelClass;
