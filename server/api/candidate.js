const Candidate = require('../models/candidate');

exports.findCandidates = () => {
    return new Promise(async(resolve, reject) => {
        try{
            const candidates = await Candidate.find()
            .sort({createdAt: 'desc'})
            .populate('_userId')
            .lean()
            const newCandidates = Object.keys(candidates).map((key, index) => {
                candidates[key].user = candidates[key]._userId;
                candidates[key]._userId = candidates[key].user._id;
                delete candidates[key].user.password;
                return candidates[key];
            })
            resolve({ candidates: newCandidates })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.addEducationToCandidate = (education, { _candidateId }) => {    
    const candidateInstance = new Candidate({ education: education })
    
    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$push: { education: candidateInstance.education }}, { new: true })
            resolve({ newCandidate: newCandidate })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.addWorkExperienceToCandidate = (workExperience, { _candidateId }) => {
    const candidateInstance = new Candidate({ workExperience: workExperience })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$push: { workExperience: candidateInstance.workExperience }}, { new: true })
            resolve({ newCandidate: newCandidate })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.addProjectToCandidate = (project, { _candidateId }) => {
    const candidateInstance = new Candidate({ projects: project })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$push: { projects: candidateInstance.projects }}, { new: true })
            resolve({ newCandidate: newCandidate })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.changeCandidateProfile = (candidateProfile, { _candidateId }) => {    
    const candidateInstance = new Candidate({ candidateProfile: candidateProfile })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$set: { candidateProfile: candidateInstance.candidateProfile }}, { new: true })
            resolve({ newCandidate: newCandidate })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}