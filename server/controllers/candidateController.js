const {
    addEducationToCandidate,
    addWorkExperienceToCandidate,
    addProjectToCandidate,
    changeAboutInCandidate
} = require('../api/candidate')

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
    const project = { 
        projectName, 
        url, 
        skills: skills.split(',').map(skill => skill.trim()),
        description 
    }

    try{
        const { newCandidate } = await addProjectToCandidate(project, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}


exports.updateAbout = async(req, res) => {
    const { city, province, portfolioUrl, githubUrl, linkedInUrl, summary, careerObjective } = req.body;
    const about = { city, province, portfolioUrl, githubUrl, linkedInUrl, summary, careerObjective };

    try{
        const { newCandidate } = await changeAboutInCandidate(about, req.user)
        res.status(200).send({ candidate: newCandidate })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}