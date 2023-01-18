const applicantModel = require('../../model/applicant.model/applicant.model');

const Update = async (req, res) => {
    try {
        const _res = await applicantModel.findByIdAndUpdate(req.params.id, req.body);
        return res.send({
            message: "Applied Updated",
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    }
}
module.exports = Update;
