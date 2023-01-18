const mongoose = require("mongoose");

const attandanceModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    attandance: [
        {
            date: String,
            attandance: Number,
            isPresent: Boolean
        }
    ],
    totalAttandance: Number
});

module.exports = new mongoose.model("attandance", attandanceModel);