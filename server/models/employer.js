const mongoose = require('mongoose');
const { Schema } = mongoose;

const employerSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: String,
    companyWebsite: String,
    _jobPostIds: [
        { type: Schema.Types.ObjectId, ref: 'JobPost' }
    ]
}, {
    timestamps: true
});

const ModelClass = mongoose.model('Employer', employerSchema);

module.exports = ModelClass;
