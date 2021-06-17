var express = require('express');
var router = express.Router();

const { usersController } = require('../controllers');

router.get("/userinfo", usersController.userInfo.get);
router.post("/signup/isvalidusername", usersController.isValidUserName.post);
router.post("/signup/isvalidemail", usersController.isValidEmail.post);
router.post("/signup", usersController.signUp.post);
router.post("/signin", usersController.signIn.post);
router.post("/signout", usersController.signOut.post);
router.post("/socialsignin", usersController.socialSignIn.post);
router.post("/updateuserinfo", usersController.updateUserInfo.post);
router.post("/updateuserinfo/preference", usersController.updateUserInfoPreference.post);

module.exports = router;