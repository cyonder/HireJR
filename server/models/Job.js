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
    isActive: Boolean
});

const ModelClass = mongoose.model('job', jobSchema);
module.exports = ModelClass;
