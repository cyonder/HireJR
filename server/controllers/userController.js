const User = require('../models/user');

exports.find = (req, res) => {
    User.findById(req.user.id)
            .populate({
                path: '_employerId',
                populate:{
                    path: '_jobPostIds'
                }
            })
            .populate('_candidateId')
            .lean()
            .exec((err, user) => {
                if(err){
                    console.log(err);
                    res.status(500).send({
                        message: "Some error occurred while retrieving the user!"
                    });
                }else{
                    if(user._candidateId){
                        user.candidate = user._candidateId;
                        user._candidateId = user.candidate._id;
                    }

                    if(user._employerId){
                        user.employer = user._employerId;
                        user._employerId = user.employer._id;
                    }

                    // if(user.employer._jobPostIds){
                    //     user.employer.jobPosts = user.employer._jobPostIds;
                    //     user.employer._jobPostIds = user.employer.jobPosts._id;
                    // }

                    res.send(user);
                }
            })
}
