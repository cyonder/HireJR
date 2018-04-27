const express = require('express');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const Candidate = require('../controllers/candidateController');

const candidateRouter = express.Router();

candidateRouter.get('/', Candidate.findAll);
candidateRouter.get('/:id', Candidate.findOne);

candidateRouter.post('/education', requireAuth, Candidate.createEducation);
candidateRouter.put('/education/:id', requireAuth, Candidate.updateEducation);
candidateRouter.delete('/education/:id', requireAuth, Candidate.deleteEducation);

candidateRouter.post('/workexperience', requireAuth, Candidate.createWorkExperience);
candidateRouter.put('/workexperience/:id', requireAuth, Candidate.updateWorkExperience);
candidateRouter.delete('/workexperience/:id', requireAuth, Candidate.deleteWorkExperience);

candidateRouter.post('/projects', requireAuth, Candidate.createProject);
candidateRouter.put('/projects/:id', requireAuth, Candidate.updateProject);
candidateRouter.delete('/projects/:id', requireAuth, Candidate.deleteProject);

candidateRouter.post('/profile', requireAuth, Candidate.updateCandidateProfile);

module.exports = candidateRouter;
