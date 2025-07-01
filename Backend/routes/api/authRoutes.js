import express from "express";
import authValidator from "../../validators/authValidatorCheck.js";
import {signup, login, completerofile, updateProfile,getMe} from "../../controllers/authController.js";

import { protect} from "../../middleware/protect.js";
import { completeProfile } from "../../../controllers/authController.js";
import passport from "passport";
import { googleOAuth}    from "../../../controllers/authController.js";


const { signupValidator, signupValidateRequest } = authValidator;
// import gravatar from "gravatar";

    const router = express.Router();

// @ route /api/auth/signup
// @ desc Register/ Signup a new User
// @acess Public
      router.post("/signup",signupValidator,signupValidateRequest, signup);

// @ route /api/auth/complete-profile
// @ desc Complete User Profile for the first time after user signup for non OAuth users
// @access Private

          
      router.put("/complete-profile",protect,completeProfile);

// @ route /api/auth/login
// @ desc Login for the User
// @access Public
          router.post("/login", login);

// @ route /api/auth/edit-profile
// @ desc User can Update/Edit their Profile
// @access Private

          router.put('/edit-profile', protect, updateProfile);
// router.post('/logout',logout);   // Implement the Logout part later

// // @ route /api/auth/google
// // @ desc Google OAuth
// // @access Public
            // router.post("/oauth/google", googleOAuth);


            router.get('/oauth/google',
                  passport.authenticate('google',{
                      
                        scope:['profile','email'],
                        session:false
                  })
            );

            router.get('/oauth/google/callback',
                  passport.authenticate('google',{
                        session:false,
                        failureRedirect: `${process.env.CLIENT_REDIRECT_URL}/login`,
                        failureMessage:" Attempt failed. Try again.."
                  }),
                  googleOAuth
            );

// Protected route to get user details
// @ route /api/auth/me
// @ desc Get current user details
// @access Private

          router.get("/me", protect, getMe);


export default router;



