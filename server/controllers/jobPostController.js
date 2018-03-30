const JobPost = require('../models/jobPost');
const Employer = require('../models/employer');
const User = require('../models/user');

exports.create = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Job post can not be empty"
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

    jobPost.save((err, jobPost) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the job listing!"
            });
        }else{
            const jobPostId = jobPost._id;
            Employer.findByIdAndUpdate(req.user._id, {
                $push: { _jobPostIds: jobPostId }
            }, (err, employer) => {
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

                            User.findByIdAndUpdate(req.user._id, {
                                _employerId: data._id
                            }, err => {
                                if(err){ console.log(err) }
                            });
                            // res.send(data);
                        });
                    }
                });
            res.send(jobPost);
        }
    });
}

exports.findAll = (req, res) => {
    JobPost.find((err, jobPosts) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving the job posts!"
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
                    message: "Job post not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.id
            });
        }

        if(!jobPost) {
            return res.status(404).send({
                message: "Job post not found with id " + req.params.id
            });
        }

        res.send({
            message: "Job post deleted successfully!"
        })
    });
}
