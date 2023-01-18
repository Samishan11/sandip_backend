const user = require('../../model/user.model/user.model');
const jsonwebtoken = require("jsonwebtoken")
const bcryptjs = require('bcryptjs')

const LOGIN = async (req, res) => {
    const data = req.body;
    user.findOne({ email: data.email }).then(function (userData) {
        if (userData === null) {
            return res.json({ message: "User does not exist!", success: false });
        }
        //checking password
        const password = data.password;
        bcryptjs.compare(password, userData.password, function (e, result) {
            //if true correct password else incorrect
            if (result === false) {
                return res.json({ message: "Invalid Password!", success: false });
            }
            //token generate
            const token = jsonwebtoken.sign(
                {
                    userId: userData._id,
                    username: userData.username,
                    user: userData,
                    image: userData.image,
                    email: userData.email,
                    contact: userData.contact,
                    department: userData.department,
                    address: userData.address
                },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: "24hr"
                }
            );
            // res.json({ 'token': token, verified: user.verified })
            res.json({
                token: token,
                message: "Successfully Logged In!",
                isVerify:userData.isVerify,
                isAdmin: userData.isAdmin,
                success: true,
            });
        });
    });
}

module.exports = LOGIN;