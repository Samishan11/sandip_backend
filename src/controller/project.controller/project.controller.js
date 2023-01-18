const ProjectModal = require("../../model/project.model/project.model");
const taskModel = require("../../model/task.modal/task.modal")
exports.PostController = async (req, res) => {
    const {
        projectTitle,
        endAt,
        postBy
    } = req.body;
    try {
        const post = await new ProjectModal(
            {
                postBy,
                projectTitle,
                endAt,
                createAt: new Date().toDateString()
            }

        );
        await post.save();
        return res.send({
            success: true,
            message: "Project created"
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "Internal server error!!"
        })
    }
}
exports.UpdateController = async (req, res) => {
    try {
        const update = await ProjectModal.findByIdAndUpdate(req?.body);
        return res.send({
            success: true,
            message: "Project Updated"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error!!"
        })
    }
}
exports.DeleteController = async (req, res) => {
    try {
        const _delete = await ProjectModal.findByIdAndDelete(req.params.id);
        console.log(_delete)
        if (_delete) {
            await taskModel.deleteMany({ project: req.params.id })
        }
        return res.send({
            success: true,
            message: "Project Deleted"
        })
    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: "Internal server error!!"
        })
    }
}

exports.GetController = async (req, res) => {
    try {
        if (req.userInfo?.isHR || req.userInfo?.isManager || req?.userInfo?.isEmployee) {
            const get = await ProjectModal.find();
            return res.send({
                success: true,
                data: get
            })
        }
        // const get = await ProjectModal.find({ postBy: req.userInfo._id });
        return res.send({
            success: true,
            data: get
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error!!"
        })
    }
}
exports.GetSingleController = async (req, res) => {
    try {
        const get = await ProjectModal.find({ postBy: req.params.id });
        return res.send({
            success: true,
            data: get
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error!!"
        })
    }
}

