const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

// GET and POST /api/thoughts
router
   .route("/")
   .get(getAllThoughts)
   .post(createThought);

// GET, PUT, and DELETE /api/thoughts/:id
router
   .route("/:id")
   .get(getThoughtById)
   .put(updateThought)
   .delete(deleteThought);

// POST /api/thoughts/:thoughtId/reactions
router
   .route("/:thoughtId/reactions")
   .post(createReaction);

router
   .route("/:thoughtId/reactions/:reactionId")
   .delete(deleteReaction);

   module.exports = router;