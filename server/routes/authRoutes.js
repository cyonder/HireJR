const express = require('express');

const Authentication = require('../controllers/authenticationController');
const passportService = require('../services/passport');
const passport = require('passport');

const requireSignin = passport.authenticate('local', { session: false });

const authRouter = express.Router();

authRouter.post('/signin', requireSignin, Authentication.signin);
authRouter.post('/signup', Authentication.signup);

module.exports = authRouter;
