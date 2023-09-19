const router = require('express').Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({});
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Unexpected error!');
    }
});

module.exports = router;