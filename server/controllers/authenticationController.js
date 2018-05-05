require('dotenv').config();
const jwt = require('jwt-simple');

const { createUserAndEmployer, createUserAndCandidate } = require('../api/user');

const tokenForUser = user => {
    const timeStamp = new Date().getTime();
    return jwt.encode({
        sub: user._id,
        aud: user._employerId || user._candidateId,
        iat: timeStamp
    }, process.env.JWT_SECRET);
}

exports.signin = (req, res) => {
    res.send({ token: tokenForUser(req.user) }); // Passport middleware takes care of sign in.
}

exports.signup = async(req, res) => {
    const { firstName, lastName, email, password, role, employer } = req.body;
    const user = { firstName, lastName, email, password, role };

    if(role === 'employer'){
        try{
            const { newUser, newEmployer } = await createUserAndEmployer(user, employer)
            res.status(200).send({ token: tokenForUser(newUser) })
        }catch(error){
            res.status(500).send({ message: error.message, error: error })
        }
    }else if(role === 'candidate'){
        try{
            const { newUser, newCandidate } = await createUserAndCandidate(user)
            res.status(200).send({ token: tokenForUser(newUser) })
        }catch(error){
            res.status(500).send({ message: error.message, error: error })
        }
    }else{
        throw new Error("User role not found!");
    }
}