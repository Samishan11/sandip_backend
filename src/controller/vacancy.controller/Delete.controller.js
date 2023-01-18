const vacencyModel = require('../../model/vacancy.model/vacancy.model');
const { StatusCodes } = require("http-status-codes");

const DeleteVacancy = async (req, res) => {
    try {
        // if (!req.userInfo.isAdmin) {
        //     return res.send({
        //         message: "Unauthorized access",
        //         success: false
        //     })
        // }
        const _res = await vacencyModel.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.CREATED).send({
            message: "Vacancy Deleted",
            success: true
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal server error", success: false });
    }
}
module.exports = DeleteVacancy;
