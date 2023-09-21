const mongoose = require('mongoose');

const thoughtsSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false 
});

// create virtual to get reaction count
thoughtsSchema
    .virtual('reactionCount')
    .get(function() {
    return this.reactions.length
    })
    .set(function(v) {
        return this.reactions = v
    });

const Thoughts = mongoose.model('thoughts', thoughtsSchema);

module.exports = Thoughts;