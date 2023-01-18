const applicantModel = require('../../model/applicant.model/applicant.model');

const GetVacency = async (req, res) => {

    try {
        if (req?.userInfo?.isHR || req?.userInfo?.isManager) {
            const _res = await applicantModel.find().populate('user').populate('vacancy');
            return res.send({
                message: "Application Get",
                success: true,
                data: _res
            });
        }
        const _res = await applicantModel.find({ user: req?.userInfo?._id }).populate('user').populate('vacancy');
        return res.send({
            message: "Application Get",
            success: true,
            data: _res
        });

    } catch (error) {
        return res.send({ message: "Internal server error", success: false });
    }
};


module.exports = GetVacency;
