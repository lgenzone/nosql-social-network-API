const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// GET and POST requests /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// GET, PUT, and DELETE requests /api/users/:userId

// POST and DELETE requests /api/users/:userId/friends/:friendId

module.exports - router;