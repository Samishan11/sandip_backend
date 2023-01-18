const mongoose = require("mongoose");

const vacancyModel = new mongoose.Schema({
    vacancyTitle: String,
    postAt: String,
    applicantNumber: Number,
    position: String,
    dueDate: String,
    isDueEnd: {
        type: Boolean,
        default: false
    },
    vacancyDescription: String,
    jobType: String,
    jobSalary: Number,
    location: String,
});

module.exports = new mongoose.model("vacancy", vacancyModel);