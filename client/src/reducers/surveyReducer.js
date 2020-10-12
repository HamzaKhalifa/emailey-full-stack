import { SUBMIT_SURVEY, SUBMIT_SURVEY_SUCCESS, SUBMIT_SURVEY_ERROR } from '../actions/types';

const initialState = {
    submitLoading: false,
    submitError: ''
}

const submitSurvey = (state, action) => {
    return {
        ...state,
        submitLoading: true,
        submitError: ''
    }
}

const submitSurveySuccess = (state, action) => {
    return {
        ...state,
        submitLoading: false,
        submitError: '',
    }
}

const submitSurveyError = (state, action) => {
    return {
        ...state,
        submitLoading: false,
        submitError: action.payload,
    }
}

const actionHandler = {
    [SUBMIT_SURVEY]: submitSurvey,
    [SUBMIT_SURVEY_SUCCESS]: submitSurveySuccess,
    [SUBMIT_SURVEY_ERROR]: submitSurveyError
}

export default (state = initialState, action) => {
    const handler = actionHandler[action.type];

    return handler ? handler(state, action) : state;
}