const JobPost = require('../models/jobPost');
const Employer = require('../models/employer');
const JobApplication = require('../models/jobApplication');

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
        questions: jobPost.questions
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

exports.deleteJobPost = (jobPostId, { _id }) => {    
    return new Promise(async(resolve, reject) => {
        try{
            const deletedJobPost = await JobPost.findByIdAndRemove(jobPostId)
            const { newEmployer } = await removeJobPostIdFromEmployer(deletedJobPost._id, _id)
            resolve({ newEmployer: newEmployer })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.updateJobPostActivation = (jobPostId, { _employerId }, isActive) => {        
    return new Promise(async(resolve, reject) => {
        try{
            const newJobPost = await JobPost.findByIdAndUpdate(jobPostId, {
                $set: {'isActive': isActive}
            }, { new: true })
            
            const newEmployer = await Employer.findById(_employerId)
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
    })
}

// Job Application

exports.createJobApplication = (jobPostId, { employerId, questions }, { _candidateId }) => {  
    const jobApplicationInstance = new JobApplication({ 
        _candidateId: _candidateId,
        _employerId: employerId,
        _jobPostId: jobPostId,
        questions: questions
    })
    
    return new Promise(async(resolve, reject) => {
        try{
            const newJobApplication = await jobApplicationInstance.save()
            resolve({ newJobApplication: newJobApplication })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.fetchJobApplications = ({ _candidateId }) => {    
    return new Promise(async(resolve, reject) => {
        try{
            const jobApplications = await JobApplication.aggregate([ 
                { $match : { '_candidateId' : _candidateId } },
                { $lookup: { from: 'employers', localField: '_employerId', foreignField: '_id', as: 'employer' } },
                { $unwind: { path: '$employer', preserveNullAndEmptyArrays: true} }
            ])            
            const newJobApplications = Object.keys(jobApplications).map((key, index) => {
                delete jobApplications[key].employer._jobPostIds;
                return jobApplications[key];
            })

            resolve({ jobApplications: newJobApplications })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
}

exports.fetchJobApplicants = ({ _employerId }) => {
    return new Promise(async(resolve, reject) => {
        try{
            const jobApplicants = await JobApplication.aggregate([ 
                { $match : { '_employerId' : _employerId } },
                { $lookup: { from: 'users', localField: '_candidateId', foreignField: '_candidateId', as: 'user' } },
                { $lookup: { from: 'candidates', localField: '_candidateId', foreignField: '_id', as: 'candidate' } },
                { $unwind: { path: '$user', preserveNullAndEmptyArrays: true} },
                { $unwind: { path: '$candidate', preserveNullAndEmptyArrays: true} }
            ])            
            const newJobApplicants = Object.keys(jobApplicants).map((key, index) => {
                delete jobApplicants[key].user.password;
                return jobApplicants[key];
            })

            resolve({ jobApplicants: newJobApplicants })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
}

const removeJobPostIdFromEmployer = (jobPostId, userId) => {    
    return new Promise(async(resolve, reject) => {
        try{
            const newEmployer = await Employer.findOneAndUpdate({ _userId: userId },
            { $pull: { _jobPostIds: jobPostId }}, { new: true })
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
}

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
