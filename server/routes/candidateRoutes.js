const express = require('express');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Candidate = require('../controllers/candidateController');

const candidateRouter = express.Router();

candidateRouter.post('/candidate/education', requireAuth, Candidate.createEducation);
candidateRouter.post('/candidate/workexperience', requireAuth, Candidate.createWorkExperience);

module.exports = candidateRouter;
