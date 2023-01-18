const applicantModel = require('../../model/applicant.model/applicant.model');

const Search = async (req, res) => {
    try {
        const keys = new RegExp(req.params.keys, "i")
        var applicant = await applicantModel.find().populate('user','vacancy');
        var _search = await applicantModel.find(
            {
                "$or": [
                    { jobSalary: { $regex: keys } },
                    { "vacancy.vacancyTitle": { $regex: keys } },
                    { "vacancy.position": { $regex: keys } },
                    { "jobType": { $regex: keys } },
                    { "user.lastname": { $in: [keys] } },
                    { "user.username": { $in: [keys] } },
                    { "user.email": { $in: [keys] } },
                ]
            }
        ).populate('user','vacancy')
        if (req.params.keys === 'isHired') {
            var _res = applicant?.filter(data => {
                if (data.isHired) {
                    return data;
                }
            })
            console.log(_res)
            return res.send({ data: _res, success: true })
        } else if (req.params.keys === 'pending') {
            var _res = applicant?.filter(data => {
                if (!data.isHired) {
                    return data;
                }
            })
            console.log(_res)
            return res.send({ data: _res, success: true })
        } else {
            return res.send({ data: _search, success: true })
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: 'Internal Server Error!!', success: false })
    }
}

module.exports = Search;