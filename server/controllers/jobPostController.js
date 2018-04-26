const {
    findJobPosts,
    findJobPost,
    createJobPost,
    deleteJobPost,
    deactivateJobPost
} = require('../api/jobPost');

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
        const { newJobPost, newEmployer } = await createJobPost(jobPost, req.user)
        res.status(200).send({ employer: newEmployer, jobPostId: newJobPost._id })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.findAll = async(req, res) => {
    try{
        const { jobPosts } = await findJobPosts()   
        res.status(200).send({ jobPosts: jobPosts })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.findOne = async(req, res) => {
    try{
        const { jobPost } = await findJobPost(req.params.id)
        res.status(200).send({ jobPost: jobPost })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.update = (req, res) => {}

exports.delete = async(req, res) => {
    try{
        const { newEmployer } = await deleteJobPost(req.params.id, req.user)
        res.status(200).send({ employer: newEmployer })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}
    
exports.deactivateJobPost = async(req, res) => {    
    const { isActive } = req.body;
    try{
        const { newEmployer } = await deactivateJobPost(req.params.id, req.user, isActive)
        res.status(200).send({ employer: newEmployer })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}