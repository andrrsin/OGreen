const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        eventId: {
            type: String,
            default: "",

        },
        description: {
            type: String,
            max: 500,
            required: true,
        },
        img: {
            type: String,
            default:"",
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