const express = require('express');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const JobPost = require('../controllers/jobPostController');

const jobPostRouter = express.Router();

jobPostRouter.post('/', requireAuth, JobPost.create);

jobPostRouter.get('/', JobPost.findAll);

jobPostRouter.get('/:id', JobPost.findOne);

jobPostRouter.put('/:id', requireAuth, JobPost.update);

jobPostRouter.put('/deactivate/:id', requireAuth, JobPost.deactivateJobPost);

jobPostRouter.delete('/:id', requireAuth, JobPost.delete);

module.exports = jobPostRouter;

// jobPostRouter.route('/')
                // .post(requireAuth, JobPost.create)
                // .get(JobPost.findAll)