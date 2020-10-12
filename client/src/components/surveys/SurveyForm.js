import React from 'react'
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

function SurveyForm({ handleSubmit }) {
    const renderFields = () => {
        return(
            <>{FIELDS.map(({ label, name }, index) => (<Field key={index} label={label} name={name} component={SurveyField} type="text" />))}</>
        )
    }
    return (
        <form onSubmit={handleSubmit}>
            {renderFields()}
            <Link to="/surveys" className="red btn-flat white-text"><i className="material-icons left">cancel</i> Cancel</Link>
            <button className="teal btn-flat right white-text">Next <i className="material-icons right">done</i></button>
        </form>
    )
}

const validate = (values) => {
    let errors = {};

    FIELDS.forEach(({ name, label }) => {
        if (!values[name]) errors[name] = 'You must provide a ' + label;
    })

    if (values.recipients)
        errors.recipients = validateEmails(values.recipients);

    return errors;
}

export default reduxForm({
    validate,
    form: 'survey',
    destroyOnUnmount: false
})(SurveyForm);
