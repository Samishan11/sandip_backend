const attandanceModel = require("../../model/attandance.model/attandance.model")
exports.PostAttandance = async (req, res) => {
    try {
        const attandanceFind = await attandanceModel.findOne({ user: req.body.user })
        const filteAttandance = attandanceFind?.attandance?.find(data => {
            if (data.date === new Date().toDateString()) {
                return data;
            }
        })
        if (!attandanceFind) {
            console.log('first')
            var _res = await new attandanceModel({
                user: req.body.user,
                date: new Date().toDateString(),
                attandance: [
                    {
                        attandance: req.body.attandance,
                        isPresent: req.body.isPresent,
                        date: new Date().toDateString()
                    }
                ],
                totalAttandance: req.body.attandance
            })
            await _res.save();

        }
        if (filteAttandance) {
            console.log(filteAttandance)
            console.log('already')
            return res.send({
                success: true,
                message: "Already had attandanted"
            })
        }
        if (attandanceFind !== null) {
            var _res = await attandanceModel.findByIdAndUpdate({ _id: attandanceFind?._id }, {
                user: req?.userInfo?._id,
                $push: {
                    attandance: {
                        date: new Date().toDateString(),
                        attandance: req?.body?.attandance,
                        isPresent: req?.body?.isPresent
                    }
                },
                totalAttandance: attandanceFind?.totalAttandance + req.body.attandance
            })
        }
        return res.send({
            success: true,
            message: "Attandanced Sucessfully"
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "Internal Server Error!!!"
        })
    }
}

exports.GetAttandance = async (req, res) => {
    try {
        if (req?.userInfo?.isEmployee) {
            console.log('first')
            var _res = await attandanceModel.findOne({ user: req.userInfo._id }).populate("user")
            return res.send({
                success: true,
                data: _res,
                message: "Attandanced Get"
            })
        }
        var _res = await attandanceModel.find().populate('user')
        return res.send({
            success: true,
            data: _res,
            message: "Attandanced Get"
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.GetSingleAttandance = async (req, res) => {
    try {
        if (req?.userInfo?.isEmployee) {
            console.log('first')
            var _res = await attandanceModel.findOne({ user: req.userInfo._id }).populate("user")
            return res.send({
                success: true,
                data: _res,
                message: "Attandanced Get"
            })
        }
        console.log('second')
        var _res = await attandanceModel.find().populate('user')
        return res.send({
            success: true,
            data: _res,
            message: "Attandanced Get"
        })

    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// exports.UpdateAttandance = async (req, res) => {
//     try {
//         var _res = await new attandanceModel({
//             user: req?.userInfo?._id,
//             date: new Date().toDateString(),
//             $push: {
//                 attandance: {
//                     attandance: req.body.attandance,
//                     isPresent: req.body.isPresent
//                 }
//             },
//             totalAttandance: totalAttandance + req.body.attandance
//         })
//         await _res.save();
//         return res.send({
//             success: true,
//             message: "Attandanced Sucessfully"
//         })
//     } catch (error) {
//         return res.send({
//             success: false,
//             message: "Internal Server Error!!!"
//         })
//     }
// }