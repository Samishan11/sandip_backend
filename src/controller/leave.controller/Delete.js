const leaveModel = require('../../model/leave.model/leave.model');
const DeleteLeave = async (req, res) => {
    try {
        const _res = await leaveModel.findByIdAndDelete(req.params.id);
        return res.send({ message: "Leave Deleted", success: true });
    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    };
}
module.exports = DeleteLeave;
