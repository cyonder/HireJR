const express = require('express');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const JobPost = require('../controllers/jobPostController');

const jobPostRouter = express.Router();

jobPostRouter.post('/jobs', requireAuth, JobPost.create);

jobPostRouter.get('/jobs', JobPost.findAll);

jobPostRouter.get('/jobs/:id', JobPost.findOne);

jobPostRouter.put('/jobs/:id', requireAuth, JobPost.update);

jobPostRouter.delete('/jobs/:id', requireAuth, JobPost.delete);

module.exports = jobPostRouter;
