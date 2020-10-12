const { domain } = require('../../config/keys');

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div style="display: flex; justify-content: space-evenly;">
                        <div>
                            <a href="${domain}/api/surveys/${survey.id}/yes">Yes</a>
                        </div>
                        <div>
                            <a href="${domain}/api/surveys/${survey.id}/no">No</a>
                        </div>
                    </div>
                </div>
            </body>
        </html>
        <div>
            ${survey.body}
        </div>
    `
}