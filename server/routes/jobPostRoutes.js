const express = require('express');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const JobPost = require('../controllers/jobPostController');

const jobPostRouter = express.Router();

jobPostRouter.post('/', requireAuth, JobPost.create);

jobPostRouter.get('/', JobPost.findAll);

jobPostRouter.get('/applications', requireAuth, JobPost.fetchJobApplications);

jobPostRouter.get('/applicants', requireAuth, JobPost.fetchJobApplicants);

jobPostRouter.get('/:id', JobPost.findOne);

jobPostRouter.put('/:id', requireAuth, JobPost.update);

jobPostRouter.delete('/:id', requireAuth, JobPost.delete);

jobPostRouter.put('/activation/:id', requireAuth, JobPost.updateActivation);

jobPostRouter.post('/apply/:id', requireAuth, JobPost.createJobApplication);

module.exports = jobPostRouter;