const {
    findCandidates,
    findCandidate,
    addEducationToCandidate,
    addWorkExperienceToCandidate,
    addProjectToCandidate,
    changeCandidateProfile
} = require('../api/candidate')

exports.findAll = async(req, res) => {
    try{
        const { candidates } = await findCandidates()
        res.status(200).send({ candidates: candidates })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.findOne = async(req, res) => {
    try{
        const { candidate } = await findCandidate(req.params.id)
        res.status(200).send({ candidate: candidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.createEducation = async(req, res) => {
    const { schoolName, degree, field, startYear, endYear } = req.body;
    const education = { schoolName, degree, field, startYear, endYear };

    try{
        const { newCandidate } = await addEducationToCandidate(education, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.createWorkExperience = async(req, res) => {
    const { companyName, title, summary, startYear, endYear } = req.body;
    const workExperience = { companyName, title, summary, startYear, endYear } 

    try{
        const { newCandidate } = await addWorkExperienceToCandidate(workExperience, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.createProject = async(req, res) => {    
    const { projectName, url, skills, description } = req.body;
    const project = { projectName, url, description }
    
    try{
        const { newCandidate } = await addProjectToCandidate(project, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}


exports.updateCandidateProfile = async(req, res) => {
    const { 
        title, city, province, portfolioUrl, githubUrl, linkedInUrl, skills, summary, careerObjective 
    } = req.body;
    
    const candidateProfile = { 
        title, city, province, portfolioUrl, githubUrl, linkedInUrl, summary, careerObjective 
    };

    let newSkills = skills.toString().replace(/(^[,\s]+)|([,\s]+$)/g, ''); // First converting skills to string. Because 'split' can't split array. 
    candidateProfile.skills = newSkills.split(',').map(skill => skill.trim())

    try{
        const { newCandidate } = await changeCandidateProfile(candidateProfile, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}