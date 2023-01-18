const express = require("express");
const router = express.Router();
const {PostController , UpdateController , DeleteController , GetController , GetProjectTaskController} = require("../controller/task.controller/task.controller");
const {VerifyJWT} = require("../middleware/auth");
// 
router.get("/get-task", VerifyJWT, GetController),
router.get("/get-task/:id", GetProjectTaskController),
router.post("/post/task", PostController),
router.put("/update-task/:id", UpdateController),
router.delete("/delete-task/:id", DeleteController)

module.exports = router;