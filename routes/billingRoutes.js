const stripe = require('stripe')(require('../config/keys').stripeSecretKey);
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            source: req.body.id,
            description: '$5 for 5 Email credits'
        });

        req.user.credits = req.user.credits + 5;

        const user = await req.user.save();

        res.send(user);
    });
}