const express = require('express');

const Jobs = require('../controllers/jobsController');

const jobRouter = express.Router();

jobRouter.post('/jobs', Jobs.create);
jobRouter.get('/jobs', Jobs.findAll);
jobRouter.get('/jobs/:id', Jobs.findOne);

module.exports = jobRouter;
