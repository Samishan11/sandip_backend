const applicantModel = require('../../model/applicant.model/applicant.model');

const PostVacency = async (req, res) => {
    let { vacancy } = req.body;
    console.log(req.userInfo)
    try {
        const _res = await new applicantModel({
            vacancy,
            applied_at: new Date().toDateString(),
            user: req?.userInfo?._id,
            cv: req.file.path
        });
        await _res.save();
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
