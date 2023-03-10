const { User, Thought } = require('../models');
    
module.exports = {
// /api/thoughts
    //GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //GET to get a single thought by its _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
    //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json({ message: 'Thought created successfully' });
        })
        .catch((err) => res.status(500).json(err));
    },
    //PUT to update a thought by its _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators: true,
        })
        .then((thought) => {
            if(!thought) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
    //DELETE to remove a thought by its _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then((thought) => {
            if(!thought) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            return User.findOneAndUpdate(
                { _id: thought.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then((userData) => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;  
            }
            res.json({ message: 'Thought deleted successfully!'})
        })
        .catch((err) => res.status(500).json(err));
    },   
// /api/thoughts/:thoughtId/reactions
    //POST to create a reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true }
        )
        .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(thoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(400).json(err));
    },
};
