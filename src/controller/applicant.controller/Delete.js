const vacancyFormModel = require('../../model/applicant.model/applicant.model');

const PostVacency = async (req, res) => {
    try {
        const _res = await vacancyFormModel.findByIdAndDelete(req.params.id);
        return res.send({
            message: "Applied Sucessfully",
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    }
}
module.exports = PostVacency;
