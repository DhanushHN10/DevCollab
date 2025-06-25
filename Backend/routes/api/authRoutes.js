import express from "express";
import {check, validationResult} from "express-validator";
// import {User} from "../../models/User.js";
import signupValidator from "../../validators/authValidator.js";

const router = express.Router();

// @ route /api/auth/signup
// @ desc Register/ Signup a new User
// @acess Public
router.post("/signup",signupValidator, signup)

// @ route /api/auth/login
// @ desc Login for the User
// @access Public
router.post("/login", login);

// router.post('/logout',logout);

// @ route /api/auth/google
// @ desc Google OAuth
// @access Public
router.post("/oauth/google", googleOAuth);

// Protected route to get user details
// @ route /api/auth/me
// @ desc Get current user details
// @access Private

router.get("/me", (req, res) => {
  res.send("User details...");
});
