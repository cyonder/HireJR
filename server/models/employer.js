const mongoose = require('mongoose');
const { Schema } = mongoose;

const employerSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String,
        required: true  
    },
    companyWebsite: {
        type: String,
        required: true  
    },
    _jobPostIds: [
        { type: Schema.Types.ObjectId, ref: 'JobPost' }
    ]
}, {
    timestamps: true
});

const ModelClass = mongoose.model('Employer', employerSchema);

module.exports = ModelClass;
