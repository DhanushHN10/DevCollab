import dotenv  from 'dotenv';
dotenv.config();
import passport from 'passport';
import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import User from '../models/User.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,            
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/oauth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {  
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
        
          const existingEmailUser = await User.findOne({ email });

          if (existingEmailUser) {
            return done(new Error('Email already exists with another account'));
          }

        
          user = await User.create({
            name: profile.displayName,
            googleId: profile.id,
            username: profile.displayName.toLowerCase().replace(/\s/g, ''),
            email,
            isOAuthUser: true,
            avatar: profile.photos[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

