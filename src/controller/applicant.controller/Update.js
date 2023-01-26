const applicantModel = require('../../model/applicant.model/applicant.model');
const { mail } = require("../../utils/mail");
const user = require('../../model/user.model/user.model');

const Update = async (req, res) => {
    try {
        const _res = await applicantModel.findByIdAndUpdate(req.params.id, req.body);
        const userData = await user.findOne({ _id: _res.user })
        if (!_res) {
            return res.send({
                message: "Something went wrong",
                success: false
            });
        }
        if (req.body.isHired === true) {
            mail().sendMail({
                from: process.env.HOST,
                to: userData.email,
                subject: "Interview",
                html: ` <p style="text-align:center; font-size:16px;">Hello ${userData.username}, We are glad to see your CV and we decide to take your interview. Pleave visit our office. Thank You</p>`
            });
        }
        return res.send({
            message: "Applicant has been hired for interview.",
            success: true
        });

    } catch (error) {
        console.log(error)
        return res.send({ message: "Internal server error", success: false });
    }
}
module.exports = Update;
