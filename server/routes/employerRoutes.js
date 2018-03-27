const express = require('express');

const Employer = require('../controllers/employerController');

const employerRouter = express.Router();

employerRouter.get('/employer/:id', Employer.findOne);

module.exports = employerRouter;
