const express = require('express');
const router = express.Router();
const { createCase, getMyCases, getCase, generateReport } = require('../controllers/caseController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .post(protect, upload.array('evidence', 5), createCase) // Max 5 files
    .get(protect, getMyCases);

router.route('/:id')
    .get(protect, getCase);

router.route('/:id/report')
    .get(protect, generateReport);

module.exports = router;
