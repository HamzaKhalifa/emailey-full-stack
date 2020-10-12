const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateEmails = (emails) => {
    emails = emails.trim();
    if (emails.length > 0 && emails[emails.length - 1] === ',') emails = emails.substring(0, emails.length - 1);

    const invalidEmails = emails.split(',').map(email => email).filter(email => !re.test(email));
    if (invalidEmails.length > 0) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
}

export default validateEmails
