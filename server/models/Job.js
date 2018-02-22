const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobTitle: String,
    jobDescription: String,
    isActive: Boolean
});

mongoose.model('jobs', jobSchema);
