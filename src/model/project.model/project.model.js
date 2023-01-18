const mongoose = require("mongoose");

const projectModel = new mongoose.Schema({
    projectTitle: String,
    createAt: String,
    endAt: String,
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    totalTask: { type: Number, default: 0 },
    taskComplete: { type: Number, default: 0 }
});

module.exports = new mongoose.model("project", projectModel);