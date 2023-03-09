const { User, Thought } = require('../models');

module.exports = {
// /api/users
    //GET all users
    getAllUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: ['thoughts', 'friends'],
            select: '__v'
        })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //POST a new user
    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    //PUT to update a user by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, {new: true, runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    //DELETE to remover user by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
          .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            //BONUS: Remove a user's associated thoughts when deleted
            return Thought.deleteMany({ _id: { $in: userData.thoughts } });
          })
          .then(() => {
            res.json({ message: 'User and associated thoughts deleted!' });
          })
          .catch(err => res.status(400).json(err));
      },
    // /api/users/:userId/friends/:friendId
    // POST to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    // DELETE to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true}
        )
        .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(userData);
          })
          .catch(err => res.status(400).json(err));
    }
};