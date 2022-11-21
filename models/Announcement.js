const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        eventId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            max: 2000,
            default:"",s
        },
        img: {
            type: String,
            default:"",
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);