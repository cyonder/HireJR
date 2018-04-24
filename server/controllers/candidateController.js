const {
    findCandidates,
    findCandidate,
    addEducationToCandidate,
    updateEducationInCandidate,
    deleteEducationInCandidate,
    addWorkExperienceToCandidate,
    updateWorkExperienceInCandidate,
    deleteWorkExperienceInCandidate,
    addProjectToCandidate,
    updateProjectInCandidate,
    deleteProjectInCandidate,
    changeCandidateProfile
} = require('../api/candidate')

// Find

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

// Education

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

exports.updateEducation = async(req, res) => {
    const { schoolName, degree, field, startYear, endYear } = req.body;
    const education = { schoolName, degree, field, startYear, endYear };
    
    try{
        const { newCandidate } = await updateEducationInCandidate(education, req.params.id, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.deleteEducation = async(req, res) => {
    try{
        const { newCandidate } = await deleteEducationInCandidate(req.params.id, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

// Work Experience

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

exports.updateWorkExperience = async(req, res) => {
    const { companyName, title, summary, startYear, endYear } = req.body;
    const workExperience = { companyName, title, summary, startYear, endYear } 
    
    try{
        const { newCandidate } = await updateWorkExperienceInCandidate(workExperience, req.params.id, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.deleteWorkExperience = async(req, res) => {
    try{
        const { newCandidate } = await deleteWorkExperienceInCandidate(req.params.id, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

// Project

exports.createProject = async(req, res) => {    
    const { projectName, url, skills, summary } = req.body;
    const project = { projectName, url, summary };
    // First converting skills to string. Because 'split' can't split array.
    let newSkills = skills.toString().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
    project.skills = newSkills.split(',').map(skill => skill.trim())

    try{
        const { newCandidate } = await addProjectToCandidate(project, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.updateProject = async(req, res) => {    
    const { projectName, url, skills, summary } = req.body;    
    const project = { projectName, url, summary };
    
    let newSkills = skills.toString().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
    project.skills = newSkills.split(',').map(skill => skill.trim()) 
    
    try{
        const { newCandidate } = await updateProjectInCandidate(project, req.params.id, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.deleteProject = async(req, res) => {
    try{
        const { newCandidate } = await deleteProjectInCandidate(req.params.id, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

// Profile

exports.updateCandidateProfile = async(req, res) => {
    const { 
        title, city, province, portfolioUrl, githubUrl, linkedInUrl, skills, summary, careerObjective 
    } = req.body;
    
    const candidateProfile = { 
        title, city, province, portfolioUrl, githubUrl, linkedInUrl, summary, careerObjective 
    };

    if(skills){
        let newSkills = skills.toString().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
        candidateProfile.skills = newSkills.split(',').map(skill => skill.trim())   
    }

    try{
        const { newCandidate } = await changeCandidateProfile(candidateProfile, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}