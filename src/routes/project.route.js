const express = require("express");
const router = express.Router();
const { PostController, UpdateController, DeleteController, GetController, GetSingleController } = require("../controller/project.controller/project.controller");
const { VerifyJWT } = require("../middleware/auth")
// 
router.get("/get-project", VerifyJWT, GetController),
    router.get("/get-projectsingle/:id", GetSingleController),
    router.post("/post-project", PostController),
    router.put("/update-project/:id", UpdateController),
    router.delete("/delete-project/:id", DeleteController)

module.exports = router;