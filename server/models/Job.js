const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    position: String,
    companyName: String,
    companyWebsite: String,
    city: String,
    province: String,
    schedule: String,
    skills: [String],
    description: String,
    isActive: {
        type: Boolean,
        default: true
    },
    applyThrough: String,
    internal: String,
    external: String,
    question1: String,
    choices1: [String],
    question2: String,
    choices2: [String],
    question3: String,
    choices3: [String],
});

const ModelClass = mongoose.model('job', jobSchema);
module.exports = ModelClass;
