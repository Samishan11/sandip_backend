const mongoose = require("mongoose");

const leaveModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: String,
    leaveDuration: Number,
    leaveType: String,
    leaveHalforFull:String,
    leaveReason: String,
    leaveDate:String,
    isApproved: {
        type:Boolean,
        default:false
    }
});

module.exports = new mongoose.model("leave", leaveModel);