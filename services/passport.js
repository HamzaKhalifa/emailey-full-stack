const passport = require('passport');
const GoogleStartegy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    // The first "null" in the done function is for the error
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})

// Tell passport to use google strategy with the given options
passport.use(new GoogleStartegy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/api/auth/google/callback',
    proxy: true // To allow the strategy to to use https even for proxies
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id });
    if (existingUser) {
        // We already have a record with the given profile id
        done(null, existingUser);
    } else {
        // We don't have a record with the given profile id
        const user = await new User({ googleID: profile.id }).save();
        done(null, user);
    }
}));