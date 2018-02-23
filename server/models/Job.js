const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobTitle: String,
    jobDescription: String,
    isActive: Boolean
});

const ModelClass = mongoose.model('job', jobSchema);
module.exports = ModelClass;
