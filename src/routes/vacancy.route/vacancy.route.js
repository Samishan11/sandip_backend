const express = require("express");
const router = express.Router();
const POST_VACANCY = require('../../controller/vacancy.controller/Post.controller');
const GET_VACANCY = require('../../controller/vacancy.controller/Get.controller');
const UPDATE_VACANCY = require('../../controller/vacancy.controller/Update.controller');
const Delete = require('../../controller/vacancy.controller/Delete.controller');
const auth = require("../../middleware/auth");

// 
router.post('/post-vacancy', POST_VACANCY),
router.get('/get-vacancy', GET_VACANCY),
router.put('/update-vacancy/:id', UPDATE_VACANCY),
router.delete('/delete-vacancy/:id', Delete),

module.exports = router;