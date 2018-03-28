const express = require('express');

const authRoutes = require('./authRoutes');
const jobPostRoutes = require('./jobPostRoutes');
const userRoutes = require('./userRoutes');
const candidateRoutes = require('./candidateRoutes');

const router = express.Router();

router.use('/', authRoutes);
router.use('/', jobPostRoutes);
router.use('/', userRoutes);
router.use('/', candidateRoutes);

module.exports = router;
