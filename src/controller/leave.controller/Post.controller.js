const leaveModel = require('../../model/leave.model/leave.model');
const userModel = require("../../model/user.model/user.model");
const PostLeave = async (req, res) => {
    let { leaveDuration, user, leaveType, leaveReason, leaveDate } = req.body;
    try {
        const user = await userModel.findOne({ _id: req.body.user });
        const _res = await new leaveModel({
            user,
            date: new Date().toDateString(),
            leaveDuration,
            leaveType,
            leaveReason,
            leaveDate
        });
        await _res.save();
        if (user.leaveDuration < leaveDuration) {
            return res.send({
                message: "Insufficiant Leave Duration!!",
                success: true
            });
        }
        user.leaveDuration = user.leaveDuration - leaveDuration
        user.save()
        return res.send({
            message: "Leave apply Sucessfully",
            success: true
        });
    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    }
}
module.exports = PostLeave;
