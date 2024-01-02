const { User, Thought } = require("../models");

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
             select: "-__v"
         })
         .select("-__v")
         .sort({ _id: -1 })
         .then((thoughtData) => res.json(thoughtData))
         .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: "reactions",
             select: "-__v"
         })
         .select("-__v")
         .sort({ _id: -1 })
         .then((thoughtData) => {
            if (!thoughtData) {
                  res.status(404).json({ message: "No thought found with this id!" });
                  return;
              }
              res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
              res.status(400).json(err);
          });
    },

    createThought({ body }, res) {
        Thought.create(body)
       .then(({ _id }) => {
        return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
       .then (thoughtData => {
        if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thoughtData);
        })
       .catch((err) => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
       .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thoughtData);
        })
       .catch((err) => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
       .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.id } },
                { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                     res.status(404).json({ message: "No user found with this id!" });
                     return;
                 }
                 res.json(userData);
             })
             .catch((err) => res.status(400).json(err));
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
       .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thoughtData);
        })
       .catch((err) => res.status(400).json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((thoughtData) => {
            if (!thoughtData) {
                 res.status(404).json({ message: "No thought found with this id!" });
                 return;
             }
             res.json(thoughtData);
         })
         .catch((err) => res.status(400).json(err));
        }

    };

module.exports = thoughtController;