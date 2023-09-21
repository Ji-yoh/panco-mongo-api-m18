const router = require('express').Router();
const { User, Thoughts } = require('../../models');

// get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtsData = await Thoughts.find({});
        res.status(200).json(thoughtsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Unexpected error!');
    }
});

// create a thought, push thought id to user's thoughts array field
router.post('/', async (req, res) => {
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
})

module.exports = router;