const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSchema = new Schema({
    summary: String,
    careerObjective: String,
    city: String,
    province: String,
    portfolioUrl: String,
    githubUrl: String,
    linkedInUrl: String
}, {
    timestamps: true
});

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

const projectsSchema = new Schema({
    projectName: String,
    url: String,
    skills: [String],
    description: String
}, {
    timestamps: true
});

const resumeSchema = new Schema({
    url: String
}, {
    timestamps: true
});

const candidateSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    about: aboutSchema,
    workExperience: [workExperienceSchema],
    education: [educationSchema],
    projects: [projectsSchema],
    resume: [resumeSchema]
}, {
    timestamps: true
});

const ModelClass = mongoose.model('Candidate', candidateSchema);

module.exports = ModelClass;
