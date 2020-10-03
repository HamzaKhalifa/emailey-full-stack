const express = require('express');
// Connect to mongoose
require('./services/mongoose');
require('./models/user');
// Run passport google strategy configuration
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

app.use(cookieSession({
    // last for 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // keys to encrypt the cookie in the requests
    keys: [keys.cookieKey],
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
