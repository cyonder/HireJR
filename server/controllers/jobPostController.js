const {
    findJobPosts,
    findJobPost,
    createJobPost,
    deleteJobPost,
    updateJobPostActivation,
    createJobApplication,
    fetchJobApplications,
    fetchJobApplicants
} = require('../api/jobPost');

exports.findAll = async(req, res) => {
    try{
        const { jobPosts } = await findJobPosts()   
        res.status(200).send({ jobPosts: jobPosts })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.findOne = async(req, res) => {
    const jobPostId = req.params.id;

    try{
        const { jobPost } = await findJobPost(jobPostId)
        res.status(200).send({ jobPost: jobPost })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.create = async(req, res) => {
    const {
        position, city, province, schedule, skills, applyThrough,
        internal, external, isActive, salary, description, questions
    } = req.body;
    
    if(questions){
        questions.map(question => {
            if(question.choices){
                let choices = question.choices.toString().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
                question.choices = choices.split(',').map(choice => choice.trim())
            }else{
                question.choices = null;
            }
        })
    }
    
    const jobPost = {
        position, city, province, schedule,
        applyThrough, internal, external, isActive, salary,
        description, questions
    };

    let newSkills = skills.toString().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
    jobPost.skills = newSkills.split(',').map(skill => skill.trim())

    try{
        const { newJobPosts, newJobPostId } = await createJobPost(jobPost, req.user)
        res.status(200).send({ jobPosts: newJobPosts, jobPostId: newJobPostId })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.update = (req, res) => {}

exports.delete = async(req, res) => {
    const jobPostId = req.params.id;

    try{
        const { newJobPosts } = await deleteJobPost(jobPostId, req.user)
        res.status(200).send({ jobPosts: newJobPosts })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}
    
exports.updateActivation = async(req, res) => {   
    const jobPostId = req.params.id; 
    const { isActive } = req.body;

    try{
        const { newJobPosts } = await updateJobPostActivation(jobPostId, req.user, isActive)
        res.status(200).send({ jobPosts: newJobPosts })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

// Job Application

exports.fetchJobApplications = async(req, res) => {
    try{
        const { jobApplications } = await fetchJobApplications(req.user)
        res.status(200).send({ jobApplications: jobApplications })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.fetchJobApplicants = async(req, res) => {    
    try{
        const { jobApplicants } = await fetchJobApplicants(req.user)
        res.status(200).send({ jobApplicants: jobApplicants })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.createJobApplication = async(req, res) => {    
    const jobApplication = req.body;
    try{
        const { newJobApplications } = await createJobApplication(req.params.id, jobApplication, req.user)
        res.status(200).send({ jobApplications: newJobApplications })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}
