const Candidate = require('../models/candidate');
const User = require('../models/user');

exports.createEducation = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Education can not be empty"
        });
    }

    console.log(req.user);

    Candidate.findOneAndUpdate({_userId: req.user.id},
        { $push: { education: req.body } },
        { new: true },
        (err, candidate) => {
            if(err){ console.log(err) }
            if(!candidate){
                const candidate = new Candidate({
                    _userId: req.user.id,
                    education: req.body,
                });

                candidate.save((err, data) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occurred while creating the education!"
                        });
                    }

                    User.findByIdAndUpdate(req.user.id,
                        { _candidateId: data._id },
                        err => {
                            if(err){ console.log(err) }
                        });
                    res.send(data);
                });
            }else{
                res.send(candidate);
            }
        });
}

exports.createWorkExperience = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Work experience can not be empty"
        });
    }

    Candidate.findOneAndUpdate({_userId: req.user.id},
        { $push:
            { workExperience: req.body }
        },
        { new: true },
        (err, candidate) => {
            if(err){ console.log(err) }
            if(!candidate){
                const candidate = new Candidate({
                    _userId: req.user.id,
                    workExperience: req.body,
                });

                candidate.save((err, data) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occurred while creating the work experience!"
                        });
                    }

                    User.findByIdAndUpdate(req.user.id,
                        { _candidateId: data._id },
                        err => {
                            if(err){ console.log(err) }
                        }
                    );
                    res.send(data);
                });
            }else{
                res.send(candidate);
            }
        }
    )
}

exports.createProject = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Project can not be empty"
        });
    }

    const { projectName, url, skills, description } = req.body;

    Candidate.findOneAndUpdate({_userId: req.user.id},
        { $push:
            { projects:
                {
                    projectName,
                    url,
                    skills: skills.split(',').map(skill => skill.trim()),
                    description
                }
            }
        },
        { new: true },
        (err, candidate) => {
            if(err){ console.log(err) }
            if(!candidate){
                const candidate = new Candidate({
                    _userId: req.user.id,
                    projects: {
                        projectName,
                        url,
                        skills: skills.split(',').map(skill => skill.trim()),
                        description
                    }
                });

                candidate.save((err, data) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occurred while creating the project!"
                        });
                    }

                    User.findByIdAndUpdate(req.user.id,
                        { _candidateId: data._id },
                        err => {
                            if(err){ console.log(err) }
                        }
                    );

                    res.send(data);
                });
            }else{
                res.send(candidate);
            }
        }
    )
}

exports.updateAbout = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "About can not be empty"
        });
    }

    const { city, province, portfolioUrl, githubUrl, linkedInUrl, summary, careerObjective } = req.body;

    Candidate.findOneAndUpdate({_userId: req.user.id},
        { $set: { about: req.body } },
        { new: true },
        (err, candidate) => {
            if(err){ console.log(err) }
            if(!candidate){
                const candidate = new Candidate({
                    _userId: req.user.id,
                    about: req.body,
                });

                candidate.save((err, data) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occurred while updating the candidate!"
                        });
                    }

                    User.findByIdAndUpdate(req.user.id,
                        { _candidateId: data._id },
                        err => {
                            if(err){ console.log(err) }
                        }
                    );

                    res.send(data);
                });
            }else{
                res.send(candidate);
            }
        }
    )
}
