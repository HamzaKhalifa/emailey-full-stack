import React, { useState } from 'react'
import SurveyForm from './SurveyForm';
import { reduxForm } from 'redux-form';
import SurveyFormReview from './SurveyFormReview';

function SurveyNew() {
    const handleSubmit = values => {
        setShowFormReview(true);
    }

    const [showFormReview, setShowFormReview] = useState(false);

    return (
        <div>
            {showFormReview ? <SurveyFormReview onCancel={() => {setShowFormReview(false);}} /> : <SurveyForm onSubmit={handleSubmit} />}
        </div>
    )
}

export default reduxForm({
    form: 'survey'
})(SurveyNew);
