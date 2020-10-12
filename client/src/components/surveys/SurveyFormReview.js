import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FIELDS from './formFields';
import { submitSurvey } from '../../actions';
import Spinner from '../ui/Spinner';
import  { withRouter } from 'react-router-dom';

function SurveyFormReview({ onCancel, history: { push } }) {
    const dispatch = useDispatch();
    const values = useSelector(state => state.form.survey.values);
    const { submitLoading, submitError } = useSelector(state => state.survey);
    const submitSurveyClick = () => {
        dispatch(submitSurvey(values, push));
    }

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {FIELDS.map(({label, name}, index) => (
                    <div key={index}>
                        <label>{label}</label>
                        <div>{values[name]}</div>
                    </div>
                ))}
            </div>
            <button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>Back</button>
            {submitLoading ? 
                <div className="right"><Spinner /> </div>: <button 
                    className="green btn-flat right white-text"
                    onClick={submitSurveyClick}
                >
                    Send Survey <i className="material-icons right">email</i>
                </button>
            }
            <div className="red-text right">{submitError}</div>

        </div>
    )
}

export default memo(withRouter(SurveyFormReview));
