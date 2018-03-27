const mongoose = require('mongoose');
const { Schema } = mongoose;

const workExperienceSchema = new Schema({
    companyName: String,
    title: String,
    summary: String,
    startYear: Number,
    endYear: Number
}, {
    timestamps: true
});

const educationSchema = new Schema({
    schoolName: String,
    degree: String,
    field: String,
    startYear: Number,
    endYear: Number
}, {
    timestamps: true
});

const resumeSchema = new Schema({
    url: String
}, {
    timestamps: true
})

const candidateSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    workExperience: [workExperienceSchema],
    education: [educationSchema],
    resume: [resumeSchema]
}, {
    timestamps: true
});

const ModelClass = mongoose.model('Candidate', candidateSchema);

module.exports = ModelClass;
