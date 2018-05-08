const { 
    findCurrentUser,
    updateUser,
    updateEmployer,
    updateUserPassword
} = require('../api/user');

exports.find = async(req, res) => {
    try{
        const { currentUser } = await findCurrentUser(req.user)
        res.status(200).send({ user: currentUser })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.update = async(req, res) => {
    const user = req.body
    try{
        const { newUser } = await updateUser(req.user, user)
        res.status(200).send({ user: newUser })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.updatePassword = async(req, res) => {
    const password = req.body;
    try{
        await updateUserPassword(req.user, password)
        res.status(200).send({ message: 'Password updated!' })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}

exports.updateEmployer = async(req, res) => {
    const employer = req.body;    
    try{
        await updateEmployer(req.user, employer)
        res.status(200).send({ message: 'Employer updated!' })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}