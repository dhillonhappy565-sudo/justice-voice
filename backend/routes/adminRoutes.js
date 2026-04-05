const express = require('express');
const router = express.Router();
const { getUsers, getAllCases } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.get('/cases', getAllCases);

module.exports = router;
