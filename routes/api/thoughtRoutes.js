const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');


//GET, POST, PUT, DELETE /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

//GET, PUT, DELETE /api/thoughts/:thoughtId
router 
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//POST and DELETE /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction);


module.exports = router;