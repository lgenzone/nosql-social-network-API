const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        // convert to Date object and return in UTC
        get: function(timestamp) { 
            return new Date(timestamp.toLocaleString('en-US'), { timeZone: 'UTC'});
        }
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(timestamp) {
            return new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC'});
        },
    },
    username: { // the user that created this thought
        type: String,
        required: true
    },
    reactions: [reactionSchema]// these are like replies
    },
    { 
        toJSON: { 
        virtuals: true,
    },
    id: false 
    }
);

// create a virtual that retrieves the length of the thought's 'reactions' array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// initialize Thought model
const Thought = model('thought', thoughtSchema);


module.exports = Thought;