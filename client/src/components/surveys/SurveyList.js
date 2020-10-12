import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSurveys } from '../../actions';

function SurveyList() {
    const surveys = useSelector(state => state.survey.surveys);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSurveys());
    }, [dispatch])

    const renderSurveys = () => {
        return surveys.reverse().map((survey, index) => (
            <div key={index} className="card darken-1">
                <div className="card-content">
                    <span className="card-title">{survey.title}</span>
                    <p>
                        {survey.body}
                    </p>
                    <p className="right">
                        Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                    </p>
                </div>
                <div className="card-action">
                    <a>Yes: {survey.yes}</a>
                    <a>No: {survey.no}</a>
                </div>
            </div>
        ));
    }

    return (
        <div>
            {renderSurveys()}
        </div>
    )
}

export default SurveyList
