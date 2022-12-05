const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        eventId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            max: 200,
            default:"",
        },
        img: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);