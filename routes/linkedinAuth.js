import express from "express";
import passport from "passport";
import passportLinkedIn from "passport-linkedin-oauth2";
import { findOrCreate } from "../DbUtils/dbHandler.js";
import fs from "fs";

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL || "http://localhost:3000/auth/linkedin/callback";
const LinkedInStrategy = passportLinkedIn.Strategy;

// Routes for :
// 1. /auth/linkedin
// 2. /auth/linkedin/callback


function initPassport(req, res, next) {

  passport.initialize();
  passport.session();
  next();

}
function createLinkedInStrategy() {
  passport.use(new LinkedInStrategy({
    clientID:     LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL:  CALLBACK_URL,
    scope:        ['r_liteprofile', 'r_emailaddress'],
    passReqToCallback: true,
    state: true
  },
  
  function(req, accessToken, refreshToken, profile, done) {
    console.log("Response received");
    // console.log(profile.name.givenName);
    // console.log(profile.name.familyName);
    // console.log(profile.emails[0].value);

    // fs.writeFile("Profile.txt", JSON.stringify(profile),(err) => {
    //   if(!err)
    //   console.log("file created");
    // });
    req.session.accessToken = accessToken;
    process.nextTick(function () {
      findOrCreate(profile);
      return done(null, profile);
    });
  }
  ));
}

passport.serializeUser( (user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done (null, user)
})


const router = express.Router();

router.get("/auth/linkedin", 
  passport.authenticate("linkedin")
);

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // TODO: Redirect to thank you page instead of home page

    res.redirect('/');
  });



export default router;
export {initPassport, createLinkedInStrategy};