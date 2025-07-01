import passport from 'passport';
import {Stratergy as GoogleStratergy } from 'passport-google-oauth20';

import User from '../models/User.js';
// import dotenv from 'dotenv';

// dotenv.config();

passport.use(
    new GoogleStratergy(
        {
            clienID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback'

        },

        async(acessToken,refreshToken,Profiler,done) =>{
            try {

                const email=Profiler.emails[0].value;
                let user= await User.findOne({googleId:profile.id});


                if(!user)
                {
                    const existingEmailUser = await User.findOne({email});

                    if(existingEmailUser)
                    {
                        return done(new Error("Email already exists with another Account"));

                    }

                    user = await User.create({
                        name:profile.displayName,
                        googleId:profile.id,
                        username:profile.displayname.toLowerCase().replace(/\s/g,""),
                        email,
                        isOAuthUser:true,
                        avatar:profile.photos[0].value,
                        
                    });
                }

                done(null,user);

                
            } catch (error) {
                
                done(error,null);
            }
        }
    )
)