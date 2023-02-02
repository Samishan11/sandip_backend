const leaveModel = require('../../model/leave.model/leave.model');
const userModel = require("../../model/user.model/user.model");
const PostLeave = async (req, res) => {
    let { leaveDuration, leaveHalforFull, leaveType, leaveReason, leaveDate } = req.body;
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
                success: false
            });
        };
        if (leaveType === "paid") {
            if (user.salary < 2000) {
                console.log('err')
                return res.send({
                    message: "Insufficiant Balance!!",
                    success: false
                });
            };

            user.salary = user.salary - (user.salary/30)
            user.leaveDuration = user.leaveDuration - leaveDuration
            await user.save()
            return res.send({
                message: "Paid leave has been applied and salary has been deduct.",
                success: true
            });
        } else if (leaveType === "full") {
            if (user.salary < 1000) {
                console.log('err')
                return res.send({
                    message: "Insufficiant Balance!!",
                    success: false
                });
            };
            user.salary = user.salary - (user.salary/30 - (1000))
            // user.leaveDuration = user.leaveDuration - leaveDuration
            await user.save()
            return res.send({
                message: "Fullday leave has been applied and salary has been deduct.",
                success: true
            });
        } else if (leaveType === "half") {
            if (user.salary < 500) {
                console.log('err')
                return res.send({
                    message: "Insufficiant Balance!!",
                    success: false
                });
            };
            user.salary = user.salary - (user.salary/30 - (500))
            // user.leaveDuration = user.leaveDuration - leaveDuration
            await user.save()
            return res.send({
                message: "Halfday leave has been applied and salary has been deduct.",
                success: true
            });
        };
        user.leaveDuration = user.leaveDuration - leaveDuration
        await user.save()
        return res.send({
            message: "Leave apply Sucessfully",
            success: true
        });
    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    };
}
module.exports = PostLeave;
