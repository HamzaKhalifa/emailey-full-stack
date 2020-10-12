const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const sendEmails = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const _ = require('lodash');
const path = require('path-parser');
const { URL } = require('url');
const { Path } = require('path-parser');

const Survey = mongoose.model('survey');

module.exports = (app) => {
    app.get('/api/surveys', requireLogin, async (req,res) => {
        const surveys = await Survey.find({ _user: req.user.id });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', requireLogin, (req, res) => {
        res.send('Thank for voting!');
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title, subject, body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try {
            // Great place to send an email
            await sendEmails(survey, surveyTemplate(survey));
            await survey.save();

            req.user.credits -= 1;
            const updatedUser = await req.user.save();

            res.send(updatedUser);
        } catch (error) {
            res.status(422).send({ error });
        }
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        const events = _.chain(req.body).map(({ email, url }) => {
            const match = p.test(new URL(url).pathname);
            console.log('match', match);
            if (match) return ({ email, surveyId: match.surveyId, choice: match.choice });
        })
        .compact()
        .uniqBy('email', 'surveyId').value();

        _.forEach(events, ({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        });

        res.send({});
    })
}