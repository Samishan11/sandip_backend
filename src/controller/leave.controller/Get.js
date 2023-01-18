const leaveModel = require('../../model/leave.model/leave.model');
const GetLeave = async (req, res) => {
    try {
        if (res?.userInfo?.isEmployee) {
            const _res = await leaveModel.findOne({ user: req?.userInfo?._id });
            return res.send({
                message: "Sucess",
                success: true,
                data: _res
            });
        }
        const _res = await leaveModel.find().populate("user");
        return res.send({
            message: "Sucess",
            success: true,
            data: _res
        });
    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    }
}
module.exports = GetLeave;
