const { findCurrentUser } = require('../api/user');

exports.find = async(req, res) => {
    try{
        const { currentUser } = await findCurrentUser(req.user)
        res.status(200).send({ currentUser: currentUser })
    }catch(error){
        res.status(500).send({ message: error.message, error: error })
    }
}