const Candidate = require('../models/candidate');
const User = require('../models/user');

exports.createEducation = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Education can not be empty"
        });
    }

    Candidate.findOneAndUpdate({_userId: req.user._id},
        { $push: { education: req.body } },
        { new: true },
        (err, candidate) => {
            if(err){ console.log(err) }
            if(!candidate){
                const candidate = new Candidate({
                    _userId: req.user._id,
                    education: req.body,
                });

                candidate.save((err, data) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occurred while creating the education!"
                        });
                    }

                    User.findByIdAndUpdate(req.user._id,
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

    Candidate.findOneAndUpdate({_userId: req.user._id},
        {
            $push: { workExperience: req.body }
        },
        (err, candidate) => {
            if(err){ console.log(err) }
            if(!candidate){
                const candidate = new Candidate({
                    _userId: req.user._id,
                    workExperience: req.body,
                });

                candidate.save((err, data) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occurred while creating the work experience!"
                        });
                    }

                    User.findByIdAndUpdate(req.user._id,
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
