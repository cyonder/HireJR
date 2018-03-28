const express = require('express');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const User = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/current_user', requireAuth, User.find);

module.exports = userRouter;
