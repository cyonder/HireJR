const express = require('express');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Candidate = require('../controllers/candidateController');

const candidateRouter = express.Router();

candidateRouter.get('/', Candidate.findAll);
candidateRouter.get('/:id', Candidate.findOne);
candidateRouter.post('/education', requireAuth, Candidate.createEducation);
candidateRouter.post('/workexperience', requireAuth, Candidate.createWorkExperience);
candidateRouter.post('/projects', requireAuth, Candidate.createProject);
candidateRouter.post('/about', requireAuth, Candidate.updateCandidateProfile);

module.exports = candidateRouter;
