const express = require('express');

const User = require("../models/user.js")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const  passport  = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require("../controllers/user.js")
//for signup
router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp))

//for logout 
router.route("/logout")
.get(userController.logoutRoute);


//for login
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),userController.loginRoute)

module.exports = router;