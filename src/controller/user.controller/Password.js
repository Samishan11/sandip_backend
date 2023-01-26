const UserModel = require('../../model/user.model/user.model');
const otpGenerator = require('otp-generator');
const bcrypt = require("bcryptjs");
const { mail } = require("../../utils/mail");
const userModel = require('../../model/user.model/user.model');

// forgot password 
exports.Forgotpassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.json("Invalid request")
    } else {
        const user = await UserModel.findOne({ email })
        console.log(user)
        if (!user) {
            return res.send({ message: "Unauthorized user" })
        } else if (!user.resetToken) {

            const passwordresetcheck = user.resetToken
            console.log(passwordresetcheck)

            const reset_token = otpGenerator.generate(15, { upperCase: false, specialChars: true });
            const forgotpass = await UserModel.findOneAndUpdate({ email }, {
                resetToken: reset_token
            })
            await forgotpass.save()
            mail().sendMail({
                from: process.env.HOST,
                to: user.email,
                subject: "Reset password",
                html: `<p style="text-align:justify; font-size:16px;"> Your reset password request link: <a href="${`http://localhost:3000/reset-password/${reset_token}`}">Click here to change your password.</a> </p>`
            })
            return res.send({ message: "Your reset passowrd link has been sent to your email." })

        }
        return res.send({ message: "Already send a reset password link." })
    }
}

// reset password
exports.Resetpassowrd = async (req, res) => {
    const token = req.params.token;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (!newpassword && !confirmpassword) {
        console.log('not match')
        return res.send({ data: 'Invalid Reqest', success: false })
    } else {
        const reset_token = await UserModel.findOne({ resetToken: token })
        if (!reset_token) {
            console.log(reset_token)
            return res.send({ data: 'Invalid Reqest', success: false })
        } else {
            const user = await UserModel.findOne({ _id: reset_token._id })
            if (!user) {
                return res.send({ data: 'User not found', success: false })
            } else {
                if (newpassword !== confirmpassword) {
                    return res.send({ data: "Password not match", success: false })
                } else {
                    bcrypt.hash(newpassword, 10, async (e, hasPassword) => {
                        await UserModel.findOneAndUpdate({ _id: user._id }, {
                            password: hasPassword
                        })
                    })
                    user.resetToken = "";
                    user.save()
                    return res.send({ data: 'Password has been reseted sucessfully', success: true })
                }
            }
        }
    }
}

exports.Search = async (req, res) => {
    try {
        const keys = new RegExp(req.params.keys, "i")
        const user = await userModel.find();

        var _search = await UserModel.find(
            {
                "$or": [
                    { firstname: { $regex: keys } },
                    { lastname: { $in: [keys] } },
                    { username: { $in: [keys] } },
                    { email: { $in: [keys] } },
                ]
            }
        )

        // if (_search.length === 0) {
        //     return res.send({
        //         message: 'Not found',
        //         success: false
        //     });
        // } 
        if (req.params.keys === 'isHR') {
            const src = user?.filter(data => {
                if (data.isHR === true) {
                    return data;
                }
            });
            console.log(src)
            return res.send({ data: src, success: true })
        } else if (req.params.keys === 'isManager') {
            const src = user?.filter(data => {
                if (data.isManager) {
                    return data;
                }
            });
            console.log(src)
            return res.send({ data: src, success: true })
        } else if (req.params.keys === 'isEmployee') {
            const src = user?.filter(data => {
                if (data.isEmployee) {
                    return data;
                }
            });
            return res.send({ data: src, success: true })
        } else {
            return res.send({ data: _search, success: true })
        }

    } catch (error) {
        console.log(error)
        return res.send({ message: 'Internal Server Error!!', success: false })
    }
}