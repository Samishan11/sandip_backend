const express = require("express");
const router = express.Router();
const { PostAttandance, GetAttandance, GetSingleAttandance } = require("../controller/attandance.controller/attandance.controller");
const { VerifyJWT } = require("../middleware/auth");
// 
router.post("/post-attandance", VerifyJWT, PostAttandance),
    router.get("/get-attandance", VerifyJWT, GetAttandance),
    router.get("/get-singleattandance", GetSingleAttandance),

    module.exports = router;