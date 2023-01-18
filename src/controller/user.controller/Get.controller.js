const user = require('../../model/user.model/user.model');

const GetUser = async (req, res) => {
    
    try {
        const _res = await user.find();
        return res.send({
            message: "User Get",
            success: true,
            data: _res
        });

    } catch (error) {
        return res.send({ message: "Internal server error", success: false });
    }
};

module.exports = GetUser;
