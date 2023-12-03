const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
    }
)

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;