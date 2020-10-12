import axios from 'axios';
import { 
    FETCH_USER, 
    FETCH_USER_SUCCESS, 
    FETCH_USER_ERROR, 
    SUBMIT_SURVEY, 
    SUBMIT_SURVEY_ERROR, 
    SUBMIT_SURVEY_SUCCESS 
} from './types';

const fetchUserRequest = () => ({ type: FETCH_USER });
const fetchUserSuccess = (user) => ({ type: FETCH_USER_SUCCESS, payload: user });
const fetchUserError = (message) => ({ type: FETCH_USER_ERROR, payload: message });

export const fetchUser = () => dispatch => {
    dispatch(fetchUserRequest());
    axios.get('/api/auth/current_user').then(response => {
        dispatch(fetchUserSuccess(response.data));
    }).catch(error => {
        dispatch(fetchUserError(error.message));
    });
}

export const handleToken = (token) => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    
    dispatch(fetchUserSuccess(response.data));
}

const submitSurveyRequest = () => ({ type: SUBMIT_SURVEY });
const submitSurveySuccess = () => ({ type: SUBMIT_SURVEY_SUCCESS });
const submitSurveyError = (error) => ({ type: SUBMIT_SURVEY_ERROR, payload: error });

export const submitSurvey = (values, push) => async dispatch => {
    dispatch(submitSurveyRequest());
    await axios.post('/api/surveys', values).then(response => {
        if (response.data.error) {
            dispatch(submitSurveyError(response.data.error));
        } else {
            dispatch(fetchUserSuccess(response.data));
            dispatch(submitSurveySuccess());
            push('/surveys');
        }
    }).catch(error => {
        dispatch(submitSurveyError(error.message))
    })
}