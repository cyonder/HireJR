const {
    findCandidates, findCandidate,
    createEducationInCandidate, updateEducationInCandidate, deleteEducationInCandidate,
    createWorkExperienceInCandidate, updateWorkExperienceInCandidate, deleteWorkExperienceInCandidate,
    createProjectInCandidate, updateProjectInCandidate, deleteProjectInCandidate,
    updateCandidateProfileInCandidate
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
    const userId = req.params.id;

    try{
        const { candidate } = await findCandidate(userId)
        res.status(200).send({ candidate: candidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

// Education

exports.createEducation = async(req, res) => {
    const education = req.body;

    try{
        const { newEducation } = await createEducationInCandidate(education, req.user)
        res.status(200).send({ education: newEducation })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.updateEducation = async(req, res) => {
    const education = req.body;
    const candidateId = req.params.id;

    try{
        const { newEducation } = await updateEducationInCandidate(education, candidateId, req.user)        
        res.status(200).send({ education: newEducation })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.deleteEducation = async(req, res) => {
    const candidateId = req.params.id;

    try{
        const { newEducation } = await deleteEducationInCandidate(candidateId, req.user)
        res.status(200).send({ education: newEducation })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

// Work Experience

exports.createWorkExperience = async(req, res) => {
    const workExperience = req.body;

    try{
        const { newWorkExperience } = await createWorkExperienceInCandidate(workExperience, req.user)
        res.status(200).send({ workExperience: newWorkExperience })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.updateWorkExperience = async(req, res) => {
    const workExperience = req.body;
    const candidateId = req.params.id;

    try{
        const { newWorkExperience } = await updateWorkExperienceInCandidate(workExperience, candidateId, req.user)
        res.status(200).send({ workExperience: newWorkExperience })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.deleteWorkExperience = async(req, res) => {
    const candidateId = req.params.id;

    try{
        const { newWorkExperience } = await deleteWorkExperienceInCandidate(candidateId, req.user)
        res.status(200).send({ workExperience: newWorkExperience })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

// Project

exports.createProject = async(req, res) => {    
    const { projectName, url, skills, summary } = req.body;
    const project = { projectName, url, summary };
    let newSkills = skills.replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
    project.skills = newSkills.split(',').map(skill => skill.trim())

    try{
        const { newProjects } = await createProjectInCandidate(project, req.user)
        res.status(200).send({ projects: newProjects })
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
        const { newProjects } = await updateProjectInCandidate(project, req.params.id, req.user)
        res.status(200).send({ projects: newProjects })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.deleteProject = async(req, res) => {
    const candidateId = req.params.id;

    try{
        const { newProjects } = await deleteProjectInCandidate(candidateId, req.user)
        res.status(200).send({ projects: newProjects })
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
    }
    
    if(skills){        
        // Initial values are saved as array in redux form. First convert to string!
        let newSkills = skills.toString().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
        candidateProfile.skills = newSkills.split(',').map(skill => skill.trim())   
    }

    try{
        const { newCandidateProfile } = await updateCandidateProfileInCandidate(candidateProfile, req.user)
        res.status(200).send({ candidateProfile: newCandidateProfile })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}