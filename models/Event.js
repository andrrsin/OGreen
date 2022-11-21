const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        userId: {
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
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: "",
        },
        tags:{
            type: Array,
            default: [],

        },
        organizers: {
            type: Array,
            default: [],
        },
        participants: {
            type: Array,
            default: [],
        },
        announcements: {
            type: Array,
            default: [],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);