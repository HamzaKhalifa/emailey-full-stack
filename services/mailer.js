const sgMail = require("@sendgrid/mail");
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendGridKey);

module.exports = async ({ subject, recipients }, htmlContent) => {
    const emails = recipients.map(({ email }) => email)
    const msg = {
        to: emails,
        from: "hamza.khalifa@esprit.tn",
        subject,
        text: "Default Text",
        html: htmlContent
    };
    await sgMail.sendMultiple(msg);
}