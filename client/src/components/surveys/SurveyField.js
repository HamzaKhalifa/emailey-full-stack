import React from 'react'

function SurveyField({ input, label, meta: { error, touched } }) {
    return (
        <div>
            <label>{label}</label>
            <input type="text" {...input} style={{ marginBottom: 5 }}/>
            {touched && error && 
                <div className="red-text" style={{ marginBottom: 20 }}>
                    {error}
                </div>
            }
        </div>
    )
}

export default SurveyField
