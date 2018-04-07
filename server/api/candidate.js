const Candidate = require('../models/candidate');

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

exports.changeAboutInCandidate = (about, { _candidateId }) => {
    const candidateInstance = new Candidate({ about: about })

    return new Promise(async(resolve, reject) => {
        try{
            const newCandidate = await Candidate.findByIdAndUpdate(_candidateId,
            {$set: { about: candidateInstance.about }}, { new: true })
            resolve({ newCandidate: newCandidate })
        }catch(error){
            reject({ message: error.message, error: error })
        }
    })
}