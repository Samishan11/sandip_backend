const express = require("express");
const router = express.Router();
const POST = require('../../controller/applicant.controller/Post.controller');
const GET = require('../../controller/applicant.controller/Get.controller');
const Search = require('../../controller/applicant.controller/search');
const UPDATE = require('../../controller/applicant.controller/Update');
const DELETE = require('../../controller/applicant.controller/Delete');
const multer = require("../../upload/multer");
const { VerifyJWT } = require("../../middleware/auth")

router.post('/post-applicant', multer.single('cv'), VerifyJWT, POST);
router.get('/get-applicant', VerifyJWT, GET);
router.get('/search-applicant/:keys', Search);
router.put('/update-applicant/:id', UPDATE);
router.delete('/delete-applicant/:id', DELETE);

module.exports = router;