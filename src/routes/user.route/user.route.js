const express = require("express");
const router = express.Router();
const LOGIN = require('../../controller/user.controller/Signin.controller')
const REGISTER = require('../../controller/user.controller/Siginup.controller')
const { UPDATE, Changepassword } = require('../../controller/user.controller/Update.controller')
const GET = require('../../controller/user.controller/Get.controller')
const GET_SINGLEUSER = require('../../controller/user.controller/Singleuser')
const DELETE = require('../../controller/user.controller/Delete')
const GETUSER = require('../../controller/user.controller/GetUser')
const upload = require("../../upload/multer");
const { Forgotpassword, Resetpassowrd, Search } = require("../../controller\/user.controller/Password")
const { VerifyJWT } = require("../../middleware/auth");
// routes
router.get('/user/:id', GETUSER)
router.post('/register', VerifyJWT, REGISTER)
router.post('/login', LOGIN)
router.post('/forgot-password', Forgotpassword)
router.put('/reset-password/:token', Resetpassowrd)
router.put('/update-user/:id', upload.single("profile_pic"), UPDATE)
router.put('/change-password/:id', Changepassword)
router.get('/get-user', GET)
router.get('/search-user/:keys', Search)
router.get('/get-user/:id', GET_SINGLEUSER)
router.delete('/delete-user/:id', DELETE)
module.exports = router;