const mongoose = require('mongoose');
const keys = require('../config/keys');

const mongooseConfig = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

mongoose.connect(keys.mongoURI, mongooseConfig).catch(e => {
    console.log('ERROR', e.message)
});