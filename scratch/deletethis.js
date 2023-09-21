// from routes/userRoutes.js
/*
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

// POST new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        if (newUser) {
            res.status(200).json(newUser);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Unexpected error!');
    }
});
*/

/*
// PUT update user by id
router.put('/:userId', async (req, res) => {
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
});

// DELETE user by id
// TODO: Delete all thoughts and friends associated with this user
router.delete('/:userId', async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete(req.params.userId);
        if (!userData) {
            res.status(404).json('No user found with this id!');
        }
        await User.deleteMany({ _id: { $in: userData.friends } });
        await User.deleteMany({ _id: { $in: userData.thoughts } });
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Unexpected error!');
    }
});
*/

/*
// GET user by id
router.get('/:userId', async (req, res) => {
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
});
*/

/*
    // POST add friend to user
router.post('/:userId/friends/:friendId', async (req, res) => {
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
});

// DELETE to remove friend from user
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
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
*/

// from models/User.js
// const handleError = (err) => console.log(err);
/*
User.create({
    // _id: new mongoose.Types.ObjectId(),
    username: 'testuser',
    email: 'email1@email.com',
    thoughts: [],
    friends: []
})
    .then(result => console.log('User created!', result))
    .catch(handleError);
*/