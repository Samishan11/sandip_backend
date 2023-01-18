const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    },
    taskTitle: String,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    condition: String,
    isComplet: {
        type: Boolean
    },
    createdAt: {
        type: String,
        default: new Date().toDateString()
    },
    endAt: String
});

module.exports = new mongoose.model("task", taskModel);