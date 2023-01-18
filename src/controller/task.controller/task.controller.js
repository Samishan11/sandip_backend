const TaskModal = require("../../model/task.modal/task.modal");
const ProjectModal = require("../../model/project.model/project.model")
exports.PostController = async (req, res) => {
    try {
        const project = await ProjectModal.findOne({ _id: req.body.project })
        const post = await new TaskModal({
            taskTitle: req.body.taskTitle,
            assignedTo: req.body.assignedTo,
            condition: req.body.condition,
            endAt: req.body.endAt,
            project: req.body.project,
            condition: req.body.condition
        });
        await post.save();
        console.log(project.totalTask)
        if (post) {
            project.totalTask = project.totalTask + 1
        }
        project.save()
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
        console.log(req.body)
        const update = await TaskModal.findByIdAndUpdate(req.params.id, req?.body, { new: true });
        const project = await ProjectModal.findOne({ _id: req.body.project })
        if (update?.isComplet) {
            project.taskComplete += 1;
            project.save()
        } else {
            if (project.taskComplete === 0) {
                project.taskComplete = project.taskComplete
            } else {
                project.taskComplete -= 1;
                project.save()
            }
        }
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
    const project = await ProjectModal.findOne({ _id: req.body.project })
    try {
        const _delete = await TaskModal.findByIdAndDelete(req.params.id);
        if (_delete) {
            project.totalTask = project.totalTask - 1
        }
        await project.save()
        return res.send({
            success: true,
            message: "Project Deleted"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Internal server error!!"
        })
    }
}

exports.GetController = async (req, res) => {
    try {
        if (req?.userInfo?.isHR || req?.userInfo?.isManager) {
            const get = await TaskModal.find().populate("assignedTo");
            return res.send({
                success: true,
                data: get
            })
        }
        const get = await TaskModal.find({ assignedTo: req?.userInfo?._id }).populate("assignedTo");
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
exports.GetProjectTaskController = async (req, res) => {
    try {
        const get = await TaskModal.find({ project: req.params.id }).populate("assignedTo");
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

