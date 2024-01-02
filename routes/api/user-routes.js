const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

// GET and POST /api/users
router
   .route("/")
   .get(getAllUsers)
   .post(createUser);

// GET, PUT, and DELETE /api/users/:id
router
   .route("/:id")
   .get(getUserById)
   .put(updateUser)
   .delete(deleteUser);

// POST /api/users/:userId/friends/:friendId
router
   .route("/:userId/friends/:friendId")
   .post(addFriend)
   .delete(deleteFriend);

module.exports = router;