const Employer = require('../models/employer');

exports.findOne = (req, res) => {
    Employer.findById(req.params.id, (err, employer) => {
        if(err){
            console.log(err);
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Employer not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving employer with id " + req.params.id
            });
        }

        if(!employer){
            return res.status(404).send({
                message: "Employer not found with id " + req.params.id
            });
        }

        res.send(employer);
    });
}
