import { 
    SUBMIT_SURVEY, 
    SUBMIT_SURVEY_SUCCESS, 
    SUBMIT_SURVEY_ERROR,
    FETCH_SURVEYS,
    FETCH_SURVEYS_SUCCESS,
    FETCH_SURVEYS_ERROR,
} from '../actions/types';

const initialState = {
    surveys: [],
    fetchLoading: false,
    fetchError: false,
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

const fetchSurveys = (state, action) => {
    return {
        ...state,
        fetchLoading: true,
        fetchError: ''
    }
}

const fetchSurveysSuccess = (state, action) => {
    return {
        ...state,
        fetchLoading: false,
        fetchError: '',
        surveys: action.payload 
    }
}

const fetchSurveysError = (state, action) => {
    return {
        ...state,
        fetchLoading: false,
        fetchError: action.payload,
    }
}

const actionHandler = {
    [SUBMIT_SURVEY]: submitSurvey,
    [SUBMIT_SURVEY_SUCCESS]: submitSurveySuccess,
    [SUBMIT_SURVEY_ERROR]: submitSurveyError,
    [FETCH_SURVEYS]: fetchSurveys,
    [FETCH_SURVEYS_SUCCESS]: fetchSurveysSuccess,
    [FETCH_SURVEYS_ERROR]: fetchSurveysError
}

export default (state = initialState, action) => {
    const handler = actionHandler[action.type];

    return handler ? handler(state, action) : state;
}