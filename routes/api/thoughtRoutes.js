const router = require('express').Router();
const { User, Thoughts } = require('../../models');

// GET route for all thoughts and POST route for new thought
router.route('/')
    .get(async (req, res) => {
        try {
            const thoughtsData = await Thoughts.find({});
            res.status(200).json(thoughtsData);
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })
    .post(async (req, res) => {
        try {
            const newThought = await Thoughts.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: newThought._id } },
                { new: true }
            )
            if (!user) {
                res.status(404).json('Post created but no user found with this id!');
            }
            res.status(200).json(newThought);
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    });

// GET, PUT, and DELETE routes for single thought
router.route('/:thoughtId')
    .get(async (req, res) => {
        try {
            const thoughtsData = await Thoughts.findById(req.params.thoughtId);
            if (!thoughtsData) {
                res.status(404).json('No thought found with this id!');
            }
            res.status(200).json(thoughtsData)
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })
    .put(async (req, res) => {
        try {
            const thoughtsData = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                { $set: req.body }
                );
            if (!thoughtsData) {
                res.status(404).json('No thought found with this id!');
            };
            res.status(200).json(thoughtsData);
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    })
    .delete(async (req, res) => {
        try {
            const thoughtsData = await Thoughts.findByIdAndDelete(req.params.thoughtId);
            const user = await User.findOneAndUpdate(
                { username: thoughtsData.username },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
            if (!user) {
                res.status(404).json('No user found with this id!');
            }
            res.status(200).json('Thought deleted!')
        } catch (err) {
            console.error(err);
            res.status(500).json('Unexpected error!');
        }
    });

// POST route for new reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtsData = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        if (!thoughtsData) {
            res.status(404).json('No thought found with this id!');
        }
        res.status(200).json(thoughtsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Unexpected error!');
    }
});

// DELETE route for reaction
router.delete('/:thoughtId/reactions/:reactionId', async(req, res) => {
    try {
        const thoughtsData = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true}
        )
        if (!thoughtsData) {
            res.status(404).json('No thought found with this id!');
        }
        res.status(200).json('Reaction deleted!');
    } catch (err) {
        console.error(err);
        res.status(500).json('Unexpected error!')
    }
});

module.exports = router;