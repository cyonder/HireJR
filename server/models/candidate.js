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
    companyName: {
        type: String,
        required: true  
    },
    title: {
        type: String,
        required: true  
    },
    summary: {
        type: String,
        required: true  
    },
    startYear: {
        type: Number,
        required: true  
    },
    endYear: {
        type: Number,
        required: true  
    }
}, {
    timestamps: true
});

const educationSchema = new Schema({
    schoolName: {
        type: String,
        required: true  
    },
    degree: {
        type: String,
        required: true  
    },
    field: {
        type: String,
        required: true  
    },
    startYear: {
        type: Number,
        required: true  
    },
    endYear: {
        type: Number,
        required: true  
    }
}, {
    timestamps: true
});

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true  
    },
    url: String,
    skills: {
        type: [String],
        required: true  
    },
    description: {
        type: String,
        required: true  
    }
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
    projects: [projectSchema],
    resume: [resumeSchema]
}, {
    timestamps: true
});

const ModelClass = mongoose.model('Candidate', candidateSchema);

module.exports = ModelClass;