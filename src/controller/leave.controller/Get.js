const leaveModel = require('../../model/leave.model/leave.model');
const GetLeave = async (req, res) => {
    try {
        if (req?.userInfo?.isEmployee) {
            const _res = await leaveModel.find({ user: req?.userInfo?._id }).populate('user');
            console.log(req?.userInfo?.isEmployee)
            return res.send({
                message: "Sucess",
                success: true,
                data: _res
            });
        }
        const _res = await leaveModel.find().populate("user");
        // console.log(_res)
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
