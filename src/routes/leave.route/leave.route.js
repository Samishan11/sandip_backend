const express = require("express");
const router = express.Router();
const POST = require('../../controller/leave.controller/Post.controller');
const GET_LEAVES = require('../../controller/leave.controller/Get');
const UPDATE_LEAVES = require('../../controller/leave.controller/Update');
const {VerifyJWT} = require("../../middleware/auth");

// routes
router.post('/post-leave', POST);
router.put('/update-leave/:id', UPDATE_LEAVES);
router.get("/get-leaves", VerifyJWT , GET_LEAVES)

module.exports = router;