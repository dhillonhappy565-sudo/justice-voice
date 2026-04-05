const User = require('../models/User');
const Case = require('../models/Case');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all cases
// @route   GET /api/admin/cases
// @access  Private/Admin
exports.getAllCases = async (req, res) => {
    try {
        const cases = await Case.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(cases);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
