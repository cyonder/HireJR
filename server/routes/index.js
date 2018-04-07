const express = require('express');

const authRoutes = require('./authRoutes');
const jobPostRoutes = require('./jobPostRoutes');
const userRoutes = require('./userRoutes');
const candidateRoutes = require('./candidateRoutes');

const router = express.Router();

router.use('/', authRoutes);
router.use('/jobs', jobPostRoutes);
router.use('/user', userRoutes);
router.use('/candidate', candidateRoutes);

module.exports = router;
