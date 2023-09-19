const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, 'Must match an email address!'] },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.log(err);

User.create({
    _id: new mongoose.Types.ObjectId(),
    username: 'testuser',
    email: 'email1@email.com',
    thoughts: [],
    friends: []
})
    .then(result => console.log('User created!', result))
    .catch(handleError);

module.exports = User;