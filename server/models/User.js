const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 8
    },
    description: {
        type: String,
        max: 200,
        default: ""
    },

    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        max: 50,
        default:""
    },
    gender:{
        type: String,
        enum:['He/Him','She/Her','They/Them','not specified'],
        default: "not specified"
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    events: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: { type: String },
},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

