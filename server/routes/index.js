const express = require('express');

const authRoutes = require('./authRoutes');
const employerRoutes = require('./employerRoutes');
const jobPostRoutes = require('./jobPostRoutes');

const router = express.Router();

router.use('/', authRoutes);
router.use('/', jobPostRoutes);
router.use('/', employerRoutes);

module.exports = router;
