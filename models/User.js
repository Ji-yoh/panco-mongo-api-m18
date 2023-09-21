const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, 'Must match an email address!'] },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    }, 
    {
        toJSON: {
            virtuals: true
        },
        id: false
});

// get total count of friends on retrieval
// getter and setter for friendCount virtual
userSchema
    .virtual('friendCount')
    .get(function() {
    return this.friends.length
    })
    .set(function(v) {
        return this.friends = v
    });

const User = mongoose.model('user', userSchema);

module.exports = User;