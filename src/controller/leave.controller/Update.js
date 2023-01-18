const leaveModel = require('../../model/leave.model/leave.model');
const UpdateLeave = async (req, res) => {
    try {
        const _res = await leaveModel.findByIdAndUpdate(req.params.id, req?.body);
        return res.send({
            message: "Leave Update Sucessfully",
            success: true
        });
    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    }
}
module.exports = UpdateLeave;
