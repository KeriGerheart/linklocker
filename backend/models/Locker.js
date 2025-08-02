const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    destinationUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    ownerId: {
        type: String,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Locker = mongoose.model("Locker", lockerSchema);
module.exports = Locker;
