const user = require('../../model/user.model/user.model');

const SingleUser = async (req, res) => {
    
    try {
        const _res = await user.findOne({_id:req.params.id});
        return res.send({
            message: "User Get",
            success: true,
            data: _res
        });

    } catch (error) {
        return res.send({ message: "Internal server error", success: false });
    }
};

module.exports = SingleUser;
