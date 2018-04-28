const Candidate = require('../models/candidate');

// Find

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

exports.findCandidate = id => {
    return new Promise(async(resolve, reject) => {
        try{
            const candidate = await Candidate.findOne({'_userId': id})
            .populate('_userId')
            .lean()
            candidate.user = candidate._userId;
            candidate._userId = candidate.user._id;
            delete candidate.user.password;
            resolve({ candidate: candidate })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

// Education

exports.createEducationInCandidate = (education, { _candidateId }) => {    
    const candidateInstance = new Candidate({ education: education })
    
    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$push: { education: candidateInstance.education }}, { new: true })
            resolve({ newEducation: newCandidate.education })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.updateEducationInCandidate = (education, educationId, { _candidateId }) => {
    const candidateInstance = new Candidate({ education: education })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findOneAndUpdate({ 
                '_id': _candidateId, 
                'education._id': educationId
            },
            {$set: { 'education.$': candidateInstance.education }}, { new: true })
            resolve({ newEducation: newCandidate.education })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.deleteEducationInCandidate = (educationId, { _candidateId }) => {
    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findOneAndUpdate({ "_id" : _candidateId }, { 
                $pull: { "education": { "_id": educationId } }
            }, { new: true })
            resolve({ newEducation: newCandidate.education })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

// Work Experience

exports.createWorkExperienceInCandidate = (workExperience, { _candidateId }) => {
    const candidateInstance = new Candidate({ workExperience: workExperience })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$push: { workExperience: candidateInstance.workExperience }}, { new: true })
            resolve({ newWorkExperience: newCandidate.workExperience })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.updateWorkExperienceInCandidate = (workExperience, workExperienceId, { _candidateId }) => {
    const candidateInstance = new Candidate({ workExperience: workExperience })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findOneAndUpdate({ 
                '_id': _candidateId, 
                'workExperience._id': workExperienceId
            },
            {$set: { 'workExperience.$': candidateInstance.workExperience }}, { new: true })
            resolve({ newWorkExperience: newCandidate.workExperience })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.deleteWorkExperienceInCandidate = (workExperienceId, { _candidateId }) => {
    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findOneAndUpdate({ "_id" : _candidateId }, { 
                $pull: { "workExperience": { "_id": workExperienceId } }
            }, { new: true })
            resolve({ newWorkExperience: newCandidate.workExperience })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

// Project

exports.createProjectInCandidate = (project, { _candidateId }) => {
    const candidateInstance = new Candidate({ projects: project })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$push: { projects: candidateInstance.projects }}, { new: true })
            resolve({ newProjects: newCandidate.projects })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.updateProjectInCandidate = (project, projectId, { _candidateId }) => {
    const candidateInstance = new Candidate({ projects: project })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findOneAndUpdate({ 
                '_id': _candidateId, 
                'projects._id': projectId
            },
            {$set: { 'projects.$': candidateInstance.projects }}, { new: true })
            resolve({ newProjects: newCandidate.projects })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

exports.deleteProjectInCandidate = (projectId, { _candidateId }) => {
    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findOneAndUpdate({ "_id" : _candidateId }, { 
                $pull: { "projects": { "_id": projectId } }
            }, { new: true })
            resolve({ newProjects: newCandidate.projects })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}

// Profile

exports.updateCandidateProfileInCandidate = (candidateProfile, { _candidateId }) => {    
    const candidateInstance = new Candidate({ candidateProfile: candidateProfile })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$set: { candidateProfile: candidateInstance.candidateProfile }}, { new: true })
            resolve({ newCandidateProfile: newCandidate.candidateProfile })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}