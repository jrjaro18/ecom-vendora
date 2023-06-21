const passport = require('passport');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, cb) {
        //register user here
        console.log(profile._json);
        cb(null, profile)
    }
));