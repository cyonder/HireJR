const JobPost = require('../models/jobPost');
const Employer = require('../models/employer');

exports.createJobPost = (jobPost, { _id, _employerId }) => {
    const jobPostInstance = new JobPost({
        _employerId: _employerId,
        position: jobPost.position,
        city: jobPost.city,
        province: jobPost.province,
        schedule: jobPost.schedule,
        skills: jobPost.skills,
        applyThrough: jobPost.applyThrough,
        internal: jobPost.internal,
        external: jobPost.external,
        isActive: jobPost.isActive,
        salary: jobPost.salary,
        description: jobPost.description,
        questions: jobPost.question
    });

    return new Promise(async(resolve, reject) => {
        try{
            const newJobPost = await jobPostInstance.save()
            const { newEmployer } = await updateEmployerWithJobPostId(newJobPost._id, _id)
            resolve({ newJobPost: newJobPost, newEmployer: newEmployer })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
};

exports.findJobPosts = () => {
    return new Promise(async(resolve, reject) => {
        try{
            const jobPosts = await JobPost.find()
            .sort({createdAt: 'desc'})
            .populate('_employerId')
            .lean()
            const newJobPosts = Object.keys(jobPosts).map((key, index) => {
                if(jobPosts[key]._employerId){
                    jobPosts[key].employer = jobPosts[key]._employerId;
                    jobPosts[key]._employerId = jobPosts[key].employer._id;
                    delete jobPosts[key].employer._jobPostIds;
                    return jobPosts[key];
                }
            })
            resolve({ jobPosts: newJobPosts })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
}

exports.findJobPost = (jobPostId) => {
    return new Promise(async(resolve, reject) => {
        try{
            const jobPost = await JobPost.findById(jobPostId)
            .populate('_employerId')
            .lean()
            if(jobPost._employerId){
                jobPost.employer = jobPost._employerId;
                jobPost._employerId = jobPost.employer._id;
                delete jobPost.employer._jobPostIds;
            }
            resolve({ jobPost: jobPost })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
};

const updateEmployerWithJobPostId = (jobPostId, userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            const newEmployer = await Employer.findOneAndUpdate({ _userId: userId },
            { $push: { _jobPostIds: jobPostId }}, { new: true })
            .populate({
                path: '_jobPostIds',
                options: {
                    sort: { createdAt: 'desc' }
                }
            })
            .lean()
            if(newEmployer._jobPostIds){
                const jobPosts = newEmployer._jobPostIds;
                const _jobPostIds = jobPosts.map(jobPost => jobPost._id)
                newEmployer.jobPosts = jobPosts
                newEmployer._jobPostIds = _jobPostIds
            }
            resolve({ newEmployer: newEmployer })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
};
