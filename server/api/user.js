const User = require('../models/user');
const Employer = require('../models/employer');
const Candidate = require('../models/candidate')

exports.findCurrentUser = ({ _id }) => {
    return new Promise(async(resolve, reject) => {
        try{
            const currentUser = await User.findById(_id)
            .populate({
                path: '_employerId',
                populate:{
                    path: '_jobPostIds',
                    options: {
                        sort: { createdAt: 'desc' }
                    }
                }
            })
            .populate('_candidateId')
            .lean()
            if(currentUser._candidateId){
                currentUser.candidate = currentUser._candidateId;
                currentUser._candidateId = currentUser.candidate._id;
            }

            if(currentUser._employerId){
                currentUser.employer = currentUser._employerId;
                currentUser._employerId = currentUser.employer._id;

                if(currentUser.employer._jobPostIds){
                    currentUser.employer.jobPosts = currentUser.employer._jobPostIds;

                    const jobPosts = currentUser.employer.jobPosts;
                    const jobPostIds = (jobPosts).map(jobPost => jobPost._id);

                    currentUser.employer._jobPostIds = jobPostIds;
                }
            }
            resolve({ currentUser: currentUser })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.createUserAndEmployer = (user, employer) => {
    return new Promise(async(resolve, reject) => {
        try{
            const { newUser } = await createUser(user)
            const { newEmployer } = await createEmployer(employer, newUser._id)
            const { updatedNewUser } = await updateUserWithEmployerId(newUser._id, newEmployer._id)
            resolve({ newUser: updatedNewUser, newEmployer: newEmployer })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
};

exports.createUserAndCandidate = (user) => {
    return new Promise(async(resolve, reject) => {
        try{
            const { newUser } = await createUser(user)
            const { newCandidate } = await createCandidate(newUser._id)
            const { updatedNewUser } = await updateUserWithCandidateId(newUser._id, newCandidate._id)
            resolve({ newUser: updatedNewUser, newCandidate: newCandidate })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

const createUser = (user) => {
    const userInstance = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role
    });

    return new Promise(async(resolve, reject) => {
        try{
            const newUser = await userInstance.save()
            resolve({ newUser: newUser })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
};

const createEmployer = (employer, userId) => {
    const employerInstance = new Employer({
        _userId: userId,
        companyName: employer.companyName,
        companyWebsite: employer.companyWebsite
    });
    
    return new Promise(async(resolve, reject) => {
        try{
            const newEmployer = await employerInstance.save()
            resolve({ newEmployer: newEmployer })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
};

const createCandidate = (userId) => {
    const candidateInstance = new Candidate({ 
        _userId: userId 
    })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await candidateInstance.save()
            resolve({ newCandidate: newCandidate})
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

const updateUserWithEmployerId = (userId, employerId) => {
    return new Promise(async(resolve, reject) => {
        try{
            const updatedNewUser = await User.findByIdAndUpdate(userId, { _employerId: employerId }, { new: true })
            resolve({ updatedNewUser: updatedNewUser })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    });
};

const updateUserWithCandidateId = (userId, candidateId) => {
    return new Promise(async(resolve, reject) => {
        try{
            const updatedNewUser = await User.findByIdAndUpdate(userId, { _candidateId: candidateId }, { new: true })
            resolve({ updatedNewUser: updatedNewUser })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}