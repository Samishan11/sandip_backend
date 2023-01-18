const vacencyModel = require('../../model/vacancy.model/vacancy.model');
const { StatusCodes } = require("http-status-codes");

const GetVacancy = async (req, res) => {
    try {
        const _res = await vacencyModel.find();
        return res.send({
            message: "Vacancy Created",
            success: true,
            data:_res
        })
    } catch (error) {
        return res.send({ message: "Internal server error", success: false });
    }
}
module.exports = GetVacancy;
