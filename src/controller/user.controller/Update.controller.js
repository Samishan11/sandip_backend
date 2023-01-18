const userModel = require('../../model/user.model/user.model');
const bcryptjs = require("bcryptjs");

const UPDATE = async (req, res) => {
    var data = req?.body;
    const user = await userModel.findOne({ _id: req.params.id })
    try {
        if (!user) {
            return res.send({
                success: false,
                message: "User not found."
            })
        };
        var _res = await userModel.findByIdAndUpdate(req.params.id, {
            firstName: data?.firstName,
            lastName: data?.lastName,
            username: data?.username,
            email: data?.email,
            userRole: data?.userRole,
            address: data?.address,
            contact: data?.contact,
            department: data?.department,
            profile_pic: req?.file?.path,
            isVerify: req?.body?.isVerify,
            isHR: user.isHR ? true : !user.isManager || !user.isEmployee ? req?.body?.isHR === "true" ? true : false : false,
            isManager: user.isManager ? true : !user.isHR || !user.isEmployee ? req?.body?.isManager === "true" ? true : false : false,
            isEmployee: user.isEmployee ? true  :!user.isHR || !user.isManager ? req?.body?.isEmployee === "true" ? true : false : false
        },{new:true});
        return res.send({
            success: true,
            message: "Update Sucessfully."
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error."
        })
    }
}
const Changepassword = async (req, res) => {
    var data = req?.body;
    console.log(data)
    const password = data.password;
    const oldpass = data.oldpass;
    const user = await userModel.findOne({ _id: req.params.id })
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var checkSpecialChar = format.test(password)
    try {
        if (!user) {
            return res.send({
                success: false,
                message: "User not found."
            })
        };
        if (!checkSpecialChar) {
            return res.send({
                success: false,
                message: "Password must containe atleast 1 special charracter and uppercase"
            })
        }
        bcryptjs.compare(oldpass, user.password, function (e, result) {
            //if true correct password else incorrect
            if (result === false) {
                return res.json({ message: "Old password not match!", success: false });
            }
            bcryptjs.hash(password, 10, function (err,hashed_pw) {
                 userModel.findByIdAndUpdate(req.params.id, {
                    password: hashed_pw,
                }, { new: true }).then(data => {
                    console.log(data)
                    return res.send({
                        success: true,
                        message: "Update Sucessfully."
                    });
                })

            })
        });

    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = { UPDATE, Changepassword };