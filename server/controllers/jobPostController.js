const JobPost = require('../models/jobPost');
const Employer = require('../models/employer');

exports.create = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Job listing can not be empty"
        });
    }

    const {
        position, companyName, companyWebsite, city, province, schedule, skills,
        applyThrough, internal, external, isActive, salary, description, questions
    } = req.body;

    const jobPost = new JobPost({
        position, city, province, schedule,
        skills: skills.split(',').map(skill => skill.trim()),
        applyThrough, internal, external, isActive, salary,
        description, questions
    });

    // Save jobPost.
    // Check if req.user._id exists in employer collection as _userId,
    // if exist push jobPost._id into _jobPostIds,
    // else create employer record with companyName and companyWebsite

    jobPost.save((err, jobPost) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the job listing!"
            });
        }else{
            const jobPostId = jobPost._id;
            Employer.findOneAndUpdate(
                { '_userId': req.user._id },
                { $push: { _jobPostIds: jobPostId } },
                (err, employer) => {
                    if(err){ console.log("err", err) }
                    if(!employer){
                        const employer = new Employer({
                            _userId: req.user._id,
                            companyName: req.body.companyName,
                            companyWebsite: req.body.companyWebsite,
                            _jobPostIds: jobPostId
                        });

                        employer.save((err, data) => {
                            if(err){
                                console.log(err);
                                res.status(500).send({
                                    message: "Some error occurred while creating the employer!"
                                });
                            }
                        });
                    }
            })

            res.send(jobPost);
        }
    });
}

exports.findAll = (req, res) => {
    JobPost.find((err, jobPosts) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving the job listings!"
            });
        }else{
            res.send(jobPosts);
        }
    }).sort({createdAt: 'desc'});
}

exports.findOne = (req, res) => {
    JobPost.findById(req.params.id, (err, jobPost) => {
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Job listing not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving job listing with id " + req.params.id
            });
        }

        if(!jobPost){
            return res.status(404).send({
                message: "Job listing not found with id " + req.params.id
            });
        }

        res.send(jobPost);
    });
}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {
    JobPost.findByIdAndRemove(req.params.id, (err, jobPost) => {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Job listing not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        }

        if(!jobPost) {
            return res.status(404).send({
                message: "Job listing not found with id " + req.params.id
            });
        }

        res.send({
            message: "Job listing deleted successfully!"
        })
    });
}
