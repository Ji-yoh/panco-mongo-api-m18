const router = require('express').Router();
const { User, Thoughts } = require('../../models');

// combine GET and POST for single user
router.route('/')
    .get(async (req, res) => {
        try {
            const userData = await User.find({});
            res.status(200).json(userData);
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })
    .post(async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            if (newUser) {
                res.status(200).json(newUser);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })

// combine GET, PUT, and DELETE for single user
router.route('/:userId')
    .get(async (req, res) => {
        try {
            const userData = await User.findById(req.params.userId);
            if (!userData) {
                res.status(404).json('No user found with this id!');
            }
            res.status(200).json(userData);
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })
    .put(async (req, res) => {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body});
            if (!userData) {
                res.status(404).json('No user found with this id!');
            }
            res.status(200).json(userData);
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })
    .delete(async (req, res) => {
        try {
            const userData = await User.findByIdAndDelete(req.params.userId);
            if (!userData) {
                res.status(404).json('No user found with this id!');
            }
            await User.deleteMany({ _id: { $in: userData.friends } });
            await User.deleteMany({ _id: { $in: userData.thoughts } });
            res.status(200).json('User deleted!');
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    });

// Combine POST and DELETE for friend
router.route('/:userId/friends/:friendId')
    .post(async (req, res) => {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true } // return updated user 
            );
            if (!userData) {
                res.status(404).json('No user found with this id!');
            }
            res.status(200).json(userData);
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })
    .delete(async (req, res) => {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!userData) {
                res.status(404).json('No user found with this id!');
            }
            res.status(200).json('Friend deleted!');
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    });

module.exports = router;