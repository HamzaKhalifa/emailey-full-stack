const mongoose = require('mongoose');
const { Schema } =  require('mongoose');

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [new Schema({
        email: String,
        responded: { type: Boolean, default: false }
    })],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'user' },
    dateSent: Date,
    lastResponded: Date
});

module.exports = mongoose.model('survey', surveySchema)