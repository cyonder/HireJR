const Job = require('../models/job');

exports.create = (req, res) => {
    // const job = new Job(req.body);
    const {
        position, companyName, companyWebsite, city, province, schedule, skills, description,
        question1, choices1, question2, choices2, question3, choices3, applyThrough, internal, external
    } = req.body;

    const job = new Job({
        position,
        companyName,
        companyWebsite,
        city,
        province,
        schedule,
        skills: skills.split(',').map(skill => skill.trim()),
        description,
        applyThrough,
        internal,
        external,
        question1,
        choices1: choices1.split(',').map(choice => choice.trim()),
        question2,
        choices2: choices2.split(',').map(choice => choice.trim()),
        question3,
        choices3: choices3.split(',').map(choice => choice.trim()),
    });

    job.save((err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating the job post!"
            });
        }else{
            res.send(data);
        }
    });
}

exports.findAll = (req, res) => {
    Job.find((err, jobs) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving the job posts!"
            });
        }else{
            res.send(jobs);
        }
    });
}

exports.findOne = (req, res) => {
    Job.findById(req.params.id, (err, job) => {
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Job not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving job with id " + req.params.id
            });
        }

        if(!job){
            return res.status(404).send({
                message: "Job not found with id " + req.params.id
            });
        }

        res.send(job);
    });
};
