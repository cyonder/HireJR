const express = require('express');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const User = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', requireAuth, User.find);
userRouter.put('/', requireAuth, User.update);
userRouter.put('/password', requireAuth, User.updatePassword)
userRouter.put('/employer', requireAuth, User.updateEmployer)

module.exports = userRouter;
