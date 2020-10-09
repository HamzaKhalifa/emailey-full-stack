import axios from 'axios';
import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from './types';

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