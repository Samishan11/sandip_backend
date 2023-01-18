const bcryptjs = require("bcryptjs");
const user = require('../../model/user.model/user.model');
const { mail } = require("../../utils/mail");

const Register = async (req, res) => {
    const data = req.body;
    const password = data.password;
    let emailExist = await user.findOne({ email: data.email });
    let usernameExist = await user.findOne({ username: data.username });
    if (emailExist) {
        return res.json({
            message: "Email already exists",
            success: false,
            field: "email",
        });
    }
    if (usernameExist) {
        return res.json({
            message: "Username already taken",
            success: false,
            field: "username",
        });
    }
    if (!req?.userInfo?.isHR) {
        bcryptjs.hash(password, 10, function (e, hashed_pw) {
            const sData = new user({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                password: hashed_pw,
                email: data.email,
                userRole: data.userRole,
                address: data.address,
                contact: data.contact,
                department: data.department
            });
            sData.save(function (err) {
                // console.log(err)
                if (err) {
                    return res.json({ message: err.message });
                } else {
                    return res.json({ message: "Registered Successfully", success: true });
                }
            });
        });
    } else {
        bcryptjs.hash(password, 10, function (e, hashed_pw) {
            const sData = new user({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                password: hashed_pw,
                email: data.email,
                userRole: data.userRole,
                address: data.address,
                contact: data.contact,
                department: data.department,
                isVerify: true,
                isHR: data.isHR,
                isEmployee: data.isEmployee,
                isManager: data.isManager,
            });
            sData.save(function (err, data) {
                // console.log(err)
                if (err) {
                    return res.json({ message: err.message });
                } else {
                    mail().sendMail({
                        from: process.env.HOST,
                        to: data.email,
                        subject: "Your Authentication Credentials of HR Management System",
                        html: ` <p style="text-align:center; font-size:16px;"> Your Login Email and Password </p><p style="font-size:16px; text-align:justify;"> Email: ${data.email}   </p><p style="text-align:justify; font-size:16px;">Password:${req.body.password}</p>`
                    });
                    return res.json({ message: "Registered Successfully", success: true });
                }
            });
        });
    }
}
module.exports = Register;
