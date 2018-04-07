const {
    createJobPost,
    findJobPosts,
    findJobPost
} = require('../api/jobPost');

exports.create = async(req, res) => {
    const {
        position, city, province, schedule, skills, applyThrough,
        internal, external, isActive, salary, description, questions
    } = req.body;

    const jobPost = {
        position, city, province, schedule,
        skills: skills.split(',').map(skill => skill.trim()),
        applyThrough, internal, external, isActive, salary,
        description, questions
    };

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

exports.delete = (req, res) => {}
