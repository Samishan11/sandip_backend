const userModel = require('../../model/user.model/user.model');

const GETUSER = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id })
        return res.send({
            success: true,
            message: "GETUSER Sucessfully.",
            data: user
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = GETUSER;