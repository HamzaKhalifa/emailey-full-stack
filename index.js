const express = require('express');
// Connect to mongoose
require('./services/mongoose');
require('./models/user');
require('./models/survey');
// Run passport google strategy configuration
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    // last for 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // keys to encrypt the cookie in the requests
    keys: [keys.cookieKey],
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// Run this only in production environment
if (process.env.NODE_ENV == 'production') {
    // This to tell express that if it doen't recognize a given file, it should go check it out in the build folder
    app.use(express.static('client/build'))

    // return react build version of index.html when express doesn't recognize any of the above routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
