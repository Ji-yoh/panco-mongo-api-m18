const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId, // This is created automatically 
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, 'Must match an email address!'] },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const User = mongoose.model('user', userSchema);

module.exports = User;