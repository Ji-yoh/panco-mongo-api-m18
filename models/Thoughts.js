const mongoose = require('mongoose');

const thoughtsSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [{
        reactionId: { type: mongoose.Schema.Types.ObjectId, default: () => new Types.ObjectId()},
        reactionBody: { type: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
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

// create the Reaction schema and nest it in the Thoughts schema

// create the Thoughts model using the ThoughtsSchema
const Thoughts = mongoose.model('thoughts', thoughtsSchema);

module.exports = Thoughts;