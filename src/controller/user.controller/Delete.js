const user = require('../../model/user.model/user.model');
const task = require("../../model/task.modal/task.modal");
const leave = require("../../model/leave.model/leave.model");
const applicant = require("../../model/applicant.model/applicant.model");
const attandance = require("../../model/attandance.model/attandance.model");
const projectModel = require("../../model/project.model/project.model");
const Delete = async (req, res) => {
    try {
        await user.findOneAndDelete({ _id: req.params.id })
        res.json({
            token: token,
            message: "Successfully Deleted",
            isAdmin: userData.isAdmin,
            success: true,
        });
        await task.deleteMany({assignedTo:req.params.id});
        await leave.deleteMany({user:req.params.id});
        await applicant.deleteMany({user:req.params.id});
        await attandance.deleteMany({user:req.params.id});
        await projectModel.deleteMany({postBy:req.params.id});
    } catch (error) {
        res.json({
            success: true,
            message: "Internal server error"
        })
    }
}

module.exports = Delete;